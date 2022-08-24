package main

import (
	"context"
	"io/ioutil"
	"log"
	"net/http"

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
	RKeyPlayers       = "players"
	RKeyFired         = "fired"
	RKeyDamage        = "damage"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type GameServer struct {
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

func (gs *GameServer) handleJoinRequest(c *websocket.Conn, u *types.JoinRequest) {
	username := u.Name
	pid := generatePid()
	ctx := context.Background()
	pipe := rdb.Pipeline()
	pipe.SAdd(ctx, RKeyPlayerList, pid)
	pipe.HSet(ctx, RKeyPlayerNameMap, pid, username)

	_, err := pipe.Exec(ctx)
	if err != nil {
		log.Println("join request:", err)
		return
	}

	res := types.PidResponse{
		Pid: pid,
	}
	out, err := proto.Marshal(&res)
	if err != nil {
		log.Println("marshal:", err)
		return
	}
	err = c.WriteMessage(websocket.BinaryMessage, out)
	if err != nil {
		log.Println("handleJoinRequest write:", err)
		return
	}
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

	ctx := context.Background()
	key := RKeyPlayers + ":" + pid
	pb, err := proto.Marshal(u.Player)
	if err != nil {
		panic("marshal player")
	}
	if err = rdb.Set(context.Background(), key, pb, 0).Err(); err != nil {
		log.Println("set player:", err)
		return
	}

	var pids []string
	pipe := rdb.Pipeline()
	if u.Fired {
		pids = getPids(ctx)
		for _, pid := range pids {
			fkey := RKeyFired + ":" + pid
			if err = pipe.SAdd(ctx, fkey, pid).Err(); err != nil {
				log.Println("set fired:", err)
				continue
			}
		}
	}

	if len(u.Damages) > 0 {
		if pids != nil {
			pids = getPids(ctx)
		}

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
}

func handleConnection(gs *GameServer, c *websocket.Conn) {
	for {
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
			gs.handleJoinRequest(c, req.JoinRequest)
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
	log.Fatal(http.ListenAndServe("0.0.0.0:3000", nil))
}
