type Position = [number, number, number];

export class NetworkClient {
    private socket: WebSocket;
    private loopKey: NodeJS.Timer;
    private pid: string | null;

    constructor() {
        this.socket = null;
        this.pid = null;
    }

    async init(): Promise<void> {
        this.socket = new WebSocket("ws://localhost:3000");
        this.socket.addEventListener('message', (ev) => this.onmessage(ev))
        return new Promise((resolve) => {
            this.socket.onopen = (ev) => resolve();
        });
    }

    start(getPosition: () => Position) {
        this.socket.send(JSON.stringify({
            type: 'spawn'
        }));
        this.loopKey = setInterval(() => this.loop(getPosition), 500);
    }

    stop() {
        clearInterval(this.loopKey);
    }

    private loop(getPosition: () => Position) {
        if (this.pid === null) return;
        const position = getPosition();
        this.socket.send(JSON.stringify({
            type: 'position',
            pid: this.pid,
            position: position
        }));
    }

    private onmessage(ev: MessageEvent<any>) {
        console.log(ev);
        const data = JSON.parse(ev.data);
        if (typeof (data) !== 'object') return;
        const type = data['type'];
        if (typeof (type) !== 'string') return;

        switch (type) {
            case 'pid': {
                const pid = data['pid'];
                if (typeof (pid) !== 'string') {
                    console.warn('invalid pid data');
                    return;
                }
                this.pid = pid;
                console.log(`pid set to ${pid}`);
            }
        }
    }
}
