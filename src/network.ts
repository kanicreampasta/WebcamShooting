type Position = [number, number, number];

export class NetworkClient {
    private socket: WebSocket;

    constructor() {
        this.socket = null;
    }

    async init(): Promise<void> {
        this.socket = new WebSocket("ws://localhost:3000");
        return new Promise((resolve) => {
            this.socket.onopen = (ev) => resolve();
        });
    }

    start() {
        this.socket.send('spawn');
    }
}
