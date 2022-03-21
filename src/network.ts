type Position = [number, number, number];

export class NetworkClient {
    private socket: WebSocket;

    constructor() {
        this.socket = null;
    }

    async init(): Promise<void> {
        this.socket = new WebSocket("ws://localhost:3000");
        this.socket.addEventListener('message', (ev) => this.onmessage(ev))
        return new Promise((resolve) => {
            this.socket.onopen = (ev) => resolve();
        });
    }

    start() {
        this.socket.send(JSON.stringify({
            type: 'spawn'
        }));
    }

    private onmessage(ev: MessageEvent<any>) {
        console.log(ev);
    }
}
