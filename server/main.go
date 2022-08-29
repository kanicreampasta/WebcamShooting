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

const ()

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

	IsDead bool

	FireEvents   map[string]bool
	DamageEvents []*types.DamageInternal
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

func (gs *GameServer) makePlayerResponse(forPid string, pid string) (*types.PlayerUpdateResponse, error) {
	var (
		player  *types.Player
		fired   bool
		dead    bool
		damages []*types.DamageInternal
		err     error
	)
	if player, fired, dead, damages, err = func() (*types.Player, bool, bool, []*types.DamageInternal, error) {
		gs.PlayerListLock.Lock()
		defer gs.PlayerListLock.Unlock()
		var ok bool
		pl, ok := gs.PlayerList[pid]
		if !ok {
			return nil, false, false, nil, errors.New("player not found")
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

		forPl, ok := gs.PlayerList[forPid]
		if !ok {
			return nil, false, false, nil, errors.New("forplayer not found")
		}

		fired, ok := forPl.FireEvents[pid]
		// clear fired
		if ok {
			forPl.FireEvents[pid] = false
		}

		dead := pl.IsDead

		var damages []*types.DamageInternal
		if forPid == pid {
			damages = pl.DamageEvents
			// empty pl.DamageEvents
			if len(damages) > 0 {
				pl.DamageEvents = make([]*types.DamageInternal, 0)
				log.Println("inserted damage")
			}
		} else {
			damages = make([]*types.DamageInternal, 0)
		}
		return player, fired, dead, damages, nil
	}(); err != nil {
		return nil, err
	}

	damageResponse := make([]*types.DamageResponse, 0)
	for _, damage := range damages {
		damageResponse = append(damageResponse, &types.DamageResponse{
			By:     damage.DamagedBy,
			Amount: damage.Amount,
		})
	}

	return &types.PlayerUpdateResponse{
		Player:  player,
		Fired:   fired,
		Dead:    dead,
		Pid:     pid,
		Damages: damageResponse,
	}, nil
}

func (gs *GameServer) makeUpdateResponse(forPid string) (*types.UpdateResponse, error) {

	pids := func() []string {
		gs.PlayerListLock.RLock()
		defer gs.PlayerListLock.RUnlock()
		return gs.getPids()
	}()

	players := make([]*types.PlayerUpdateResponse, 0)
	for _, pid := range pids {
		player, err := gs.makePlayerResponse(forPid, pid)
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
	gs.PlayerListLock.Lock()
	defer gs.PlayerListLock.Unlock()
	gs.PlayerList[pid] = &PlayerInfo{
		Pid:        pid,
		FireEvents: make(map[string]bool),
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

func (gs *GameServer) getPids() []string {
	pids := make([]string, 0)
	for pid := range gs.PlayerList {
		pids = append(pids, pid)
	}
	return pids
}

func (gs *GameServer) handleClientUpdate(c *websocket.Conn, u *types.ClientUpdate) {
	pid := u.Pid

	err := func() error {
		gs.PlayerListLock.Lock()
		defer gs.PlayerListLock.Unlock()
		pl, ok := gs.PlayerList[pid]
		if !ok {
			return errors.New("not registered")
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

		pids := gs.getPids()
		if u.Fired {
			for _, otherPid := range pids {
				if otherPid == pid {
					continue
				}
				otherPl := gs.PlayerList[otherPid]
				if otherPl == nil {
					continue
				}
				otherPl.FireEvents[pid] = true
			}
		}

		for _, damage := range u.Damages {
			damagedPl := gs.PlayerList[damage.Pid]
			if damagedPl == nil {
				continue
			}
			damagedPl.DamageEvents = append(damagedPl.DamageEvents, &types.DamageInternal{
				DamagedBy: pid,
				Amount:    damage.Damage,
			})
		}
		return nil
	}()

	if err != nil {
		log.Println("handleClientUpdate:", err)
		return
	}

	// make updateRes
	updateRes, err := gs.makeUpdateResponse(pid)
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

func (gs *GameServer) handleDeadUpdate(u *types.DeadUpdate) {
	gs.PlayerListLock.Lock()
	defer gs.PlayerListLock.Unlock()
	pl := gs.PlayerList[u.Pid]
	if pl == nil {
		return
	}
	pl.IsDead = true
	log.Printf("Player %s is dead", u.Pid)
}

func (gs *GameServer) handleRespawn(u *types.RespawnRequest) {
	gs.PlayerListLock.Lock()
	defer gs.PlayerListLock.Unlock()
	pl := gs.PlayerList[u.Pid]
	if pl == nil {
		return
	}
	pl.IsDead = false
	log.Printf("Player %s respawned", u.Pid)
}

func (gs *GameServer) closeHandler(code int, text string, pid string) error {
	log.Println("close:", code, text)

	gs.PlayerListLock.Lock()
	defer gs.PlayerListLock.Unlock()

	// delete pid from player list
	delete(gs.PlayerList, pid)

	return nil
}

func handleConnection(gs *GameServer, c *websocket.Conn) {
	var pid string

	for {
		c.SetCloseHandler(func(code int, text string) error {
			if pid == "" {
				return nil
			}
			return gs.closeHandler(code, text, pid)
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
		case *types.Request_DeadUpdate:
			gs.handleDeadUpdate(req.DeadUpdate)
		case *types.Request_RespawnRequest:
			gs.handleRespawn(req.RespawnRequest)
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
	return &GameServer{
		PlayerList: make(map[string]*PlayerInfo),
	}
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
