package main

import (
	"context"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"github.com/go-redis/redis/v9"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/kanicreampasta/webcamshooting/types"
	"google.golang.org/protobuf/proto"
)

var (
	rdb *redis.Client
)

const (
	RKeyPlayerList    = "playerlist"
	RKeyPlayerNameMap = "playername"
	RKeyFired         = "fired"
	RKeyDamage        = "damage"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Vector3 struct {
	X float32
	Y float32
	Z float32
}

type PlayerInfo struct {
	Pid      string
	Position Vector3
	Velocity Vector3
	Yaw      float32
	Pitch    float32
}

type GameServer struct {
	PlayerList     map[string]*PlayerInfo
	PlayerListLock sync.RWMutex
}

func (gs *GameServer) rootHandler(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade:", err)
		return
	}
	go handleConnection(gs, c)
}

func generatePid() string {
	pid, err := uuid.NewRandom()
	if err != nil {
		panic("generate pid: " + err.Error())
	}
	return pid.String()
}

func (gs *GameServer) makePlayerResponse(ctx context.Context, forPid string, pid string) (*types.PlayerUpdateResponse, error) {
	var (
		player *types.Player
		err    error
	)
	if player, err = func() (*types.Player, error) {
		gs.PlayerListLock.RLock()
		defer gs.PlayerListLock.RUnlock()
		var ok bool
		pl, ok := gs.PlayerList[pid]
		if !ok {
			return nil, errors.New("player not found")
		}
		player := &types.Player{
			Position: &types.Vector3{
				X: pl.Position.X,
				Y: pl.Position.Y,
				Z: pl.Position.Z,
			},
			Velocity: &types.Vector3{
				X: pl.Velocity.X,
				Y: pl.Velocity.Y,
				Z: pl.Velocity.Z,
			},
			Yaw:   pl.Yaw,
			Pitch: pl.Pitch,
		}
		return player, nil
	}(); err != nil {
		return nil, err
	}

	fkey := RKeyFired + ":" + forPid
	fired, err := rdb.SRem(ctx, fkey, pid).Result()
	if err != nil {
		log.Println("get fired:", err)
		return nil, err
	}

	dkey := RKeyDamage + ":" + forPid
	damages, err := rdb.LRange(ctx, dkey, 0, -1).Result()
	if err != nil {
		log.Println("get damages:", err)
		return nil, err
	}

	damageResponse := make([]*types.DamageResponse, 0)
	for _, damage := range damages {
		damageBytes := []byte(damage)
		var damage types.DamageInternal
		if err = proto.Unmarshal(damageBytes, &damage); err != nil {
			log.Println("unmarshal damage:", err)
			continue
		}
		damageResponse = append(damageResponse, &types.DamageResponse{
			By:     damage.DamagedBy,
			Amount: damage.Amount,
		})
	}
	if len(damages) > 0 {
		rdb.Del(ctx, dkey)
	}

	return &types.PlayerUpdateResponse{
		Player:  player,
		Fired:   fired > 0,
		Pid:     pid,
		Damages: damageResponse,
	}, nil
}

func (gs *GameServer) makeUpdateResponse(ctx context.Context, forPid string) (*types.UpdateResponse, error) {
	pids := getPids(ctx)

	players := make([]*types.PlayerUpdateResponse, 0)
	for _, pid := range pids {
		player, err := gs.makePlayerResponse(ctx, forPid, pid)
		if err != nil {
			log.Println("make player response:", err)
			continue
		}
		players = append(players, player)
	}

	return &types.UpdateResponse{
		Players: players,
	}, nil
}

func (gs *GameServer) handleJoinRequest(c *websocket.Conn, u *types.JoinRequest) (string, error) {
	username := u.Name
	pid := generatePid()
	ctx := context.Background()
	pipe := rdb.Pipeline()
	pipe.SAdd(ctx, RKeyPlayerList, pid)
	pipe.HSet(ctx, RKeyPlayerNameMap, pid, username)

	_, err := pipe.Exec(ctx)
	if err != nil {
		log.Println("join request:", err)
		return "", err
	}

	pidRes := types.PidResponse{
		Pid: pid,
	}
	res := types.Response{
		ResponseOneof: &types.Response_PidResponse{
			PidResponse: &pidRes,
		},
	}
	out, err := proto.Marshal(&res)
	if err != nil {
		log.Println("marshal:", err)
		return "", err
	}
	err = c.WriteMessage(websocket.BinaryMessage, out)
	if err != nil {
		log.Println("handleJoinRequest write:", err)
		return "", err
	}
	log.Printf("Joined: %s (%s)", username, pid)
	return pid, nil
}

func getPids(ctx context.Context) []string {
	pids, err := rdb.SMembers(ctx, RKeyPlayerList).Result()
	if err != nil {
		panic("get pids")
	}
	return pids
}

func (gs *GameServer) handleClientUpdate(c *websocket.Conn, u *types.ClientUpdate) {
	pid := u.Pid

	func() {
		gs.PlayerListLock.Lock()
		defer gs.PlayerListLock.Unlock()
		pl, ok := gs.PlayerList[pid]
		if !ok {
			pl = &PlayerInfo{}
			gs.PlayerList[pid] = pl
		}

		pl.Pid = pid
		pl.Position.X = u.Player.Position.X
		pl.Position.Y = u.Player.Position.Y
		pl.Position.Z = u.Player.Position.Z
		pl.Velocity.X = u.Player.Velocity.X
		pl.Velocity.Y = u.Player.Velocity.Y
		pl.Velocity.Z = u.Player.Velocity.Z
		pl.Yaw = u.Player.Yaw
		pl.Pitch = u.Player.Pitch
	}()

	ctx := context.Background()
	var pids []string
	pipe := rdb.Pipeline()
	if u.Fired {
		pids = getPids(ctx)
		for _, otherPid := range pids {
			if otherPid == pid {
				continue
			}
			fkey := RKeyFired + ":" + otherPid
			if err := pipe.SAdd(ctx, fkey, pid).Err(); err != nil {
				log.Println("set fired:", err)
				continue
			}
		}
	}

	if len(u.Damages) > 0 {
		for _, damage := range u.Damages {
			damageInfo := types.DamageInternal{
				DamagedBy: pid,
				Amount:    damage.Damage,
			}
			damagepb, err := proto.Marshal(&damageInfo)
			if err != nil {
				panic("marshal damage")
			}

			dkey := RKeyDamage + ":" + damage.Pid
			if err = pipe.LPush(ctx, dkey, damagepb).Err(); err != nil {
				log.Println("set damage:", err)
				continue
			}
		}
	}

	if _, err := pipe.Exec(ctx); err != nil {
		log.Println("handleClientUpdate:", err)
	}

	// make updateRes
	updateRes, err := gs.makeUpdateResponse(ctx, pid)
	if err != nil {
		log.Println("make update response:", err)
		return
	}
	res := types.Response{
		ResponseOneof: &types.Response_UpdateResponse{
			UpdateResponse: updateRes,
		},
	}
	out, err := proto.Marshal(&res)
	if err != nil {
		log.Println("marshal:", err)
		return
	}
	err = c.WriteMessage(websocket.BinaryMessage, out)
	if err != nil {
		log.Println("handleClientUpdate write:", err)
		return
	}
}

func closeHandler(code int, text string, pid string) error {
	log.Println("close:", code, text)

	pipe := rdb.Pipeline()
	ctx := context.Background()

	pipe.SRem(ctx, RKeyPlayerList, pid)
	pids := getPids(ctx)
	for _, pid := range pids {
		fkey := RKeyFired + ":" + pid
		pipe.SRem(ctx, fkey, pid)
	}

	_, err := pipe.Exec(ctx)
	if err != nil {
		log.Println("close handler:", err)
		return err
	}

	return nil
}

func handleConnection(gs *GameServer, c *websocket.Conn) {
	var pid string

	for {
		c.SetCloseHandler(func(code int, text string) error {
			if pid == "" {
				return nil
			}
			return closeHandler(code, text, pid)
		})

		ty, r, err := c.NextReader()
		if err != nil {
			log.Println("read:", err)
			break
		}
		if ty != websocket.BinaryMessage {
			log.Println("not binary message")
			break
		}

		in, err := ioutil.ReadAll(r)
		if err != nil {
			log.Println("read:", err)
			break
		}

		request := types.Request{}
		if err = proto.Unmarshal(in, &request); err != nil {
			log.Println("unmarshal:", err)
			break
		}

		fail := false
		switch req := request.RequestOneof.(type) {
		case *types.Request_ClientUpdate:
			gs.handleClientUpdate(c, req.ClientUpdate)
		case *types.Request_JoinRequest:
			newPid, err := gs.handleJoinRequest(c, req.JoinRequest)
			if err != nil {
				fail = true
				break
			}
			pid = newPid
		case nil:
			log.Println("nil request")
			fail = true
		default:
			log.Println("unknown request")
			fail = true
		}

		if fail {
			break
		}
	}
}

func NewGameServer() *GameServer {
	return &GameServer{}
}

func main() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	rdb.FlushAll(context.Background())

	gs := NewGameServer()
	http.HandleFunc("/", gs.rootHandler)
	log.Println("starting in HTTP mode")
	log.Fatal(http.ListenAndServe("0.0.0.0:5000", nil))
}
