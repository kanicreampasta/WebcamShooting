package main

import (
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/kanicreampasta/webcamshooting/types"
	"google.golang.org/protobuf/proto"
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

func (gs *GameServer) makePlayerResponses(forPid string) ([]*types.PlayerUpdateResponse, error) {
	gs.PlayerListLock.Lock()
	defer gs.PlayerListLock.Unlock()

	forPl, ok := gs.PlayerList[forPid]
	if !ok {
		return nil, errors.New("forplayer not found")
	}

	results := make([]<-chan makeResponseResult, 0)
	for _, pl := range gs.PlayerList {
		results = append(results, gs.makePlayerResponseChan(forPl, pl))
	}

	// wait for all results
	responses := make([]*types.PlayerUpdateResponse, 0)
	for _, result := range results {
		r := <-result
		if r.Err != nil {
			return nil, r.Err
		}
		responses = append(responses, r.Result)
	}

	// clear queues
	// clear fire events
	forPl.FireEvents = make(map[string]bool)
	// log.Printf("cleared fire events for %v", forPid)
	// clear damage events
	forPl.DamageEvents = make([]*types.DamageInternal, 0)

	return responses, nil
}

type makeResponseResult struct {
	Err    error
	Result *types.PlayerUpdateResponse
}

func (gs *GameServer) makePlayerResponseChan(forPl *PlayerInfo, pl *PlayerInfo) <-chan makeResponseResult {
	out := make(chan makeResponseResult)

	go func() {
		r, err := gs.makePlayerResponseNoLock(forPl, pl)
		if err != nil {
			out <- makeResponseResult{Err: err}
			return
		}
		out <- makeResponseResult{Result: r}
	}()

	return out
}

func (gs *GameServer) makePlayerResponseNoLock(forPl *PlayerInfo, pl *PlayerInfo) (*types.PlayerUpdateResponse, error) {
	pid := pl.Pid
	forPid := forPl.Pid

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

	fired := forPl.FireEvents[pid]
	// log.Printf("read fired for %v: %v", forPid, fired)

	dead := pl.IsDead

	damageResponse := make([]*types.DamageResponse, 0)
	if forPid == pid {
		damages := pl.DamageEvents

		for _, damage := range damages {
			damageResponse = append(damageResponse, &types.DamageResponse{
				By:     damage.DamagedBy,
				Amount: damage.Amount,
			})
		}
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

	players, err := gs.makePlayerResponses(forPid)

	if err != nil {
		return nil, err
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

		if u.Fired {
			for otherPid, otherPl := range gs.PlayerList {
				if otherPid == pid {
					continue
				}
				// log.Printf("set fired for %v", otherPid)
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
	gs := NewGameServer()
	http.HandleFunc("/", gs.rootHandler)
	log.Println("starting in HTTP mode")
	log.Fatal(http.ListenAndServe("0.0.0.0:5000", nil))
}
