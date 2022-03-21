import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client"

type Position = [number, number, number];

export class NetworkClient {
    private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

    constructor() {
        this.socket = io("http://localhost:3000");
    }

    start() {
        this.socket.send('spawn', (initPos: Position) => {
            console.log("initPos:", initPos);
        });
    }
}
