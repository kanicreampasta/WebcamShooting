package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
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

func handleConnection(gs *GameServer, c *websocket.Conn) {
	panic("unimplemented")
}

func NewGameServer() *GameServer {
	return &GameServer{}
}

func main() {
	gs := NewGameServer()
	http.HandleFunc("/", gs.rootHandler)
	log.Println("starting in HTTP mode")
	log.Fatal(http.ListenAndServe("0.0.0.0:3000", nil))
}
