type Position = [number, number, number];
type Velocity = [number, number, number];

type PlayerGetter = () => {
    position: Position,
    velocity: Velocity,
};

export class NetworkClient {
    private socket: WebSocket;
    private loopKey: NodeJS.Timer;
    private pid: string | null;

    onplayerupdate: undefined | ((pid: string, update: {
        position?: Position,
        velocity?: Velocity
    }) => void);

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

    start(getPlayer: PlayerGetter) {
        this.socket.send(JSON.stringify({
            type: 'spawn'
        }));
        this.loopKey = setInterval(() => this.loop(getPlayer), 1000 / 30);
    }

    stop() {
        clearInterval(this.loopKey);
    }

    public get myPid(): string {
        return this.pid;
    }

    private loop(getPlayer: PlayerGetter) {
        if (this.pid === null) return;
        const pl = getPlayer();
        this.socket.send(JSON.stringify({
            type: 'position',
            pid: this.pid,
            position: pl.position,
            velocity: pl.velocity
        }));
    }

    private onmessage(ev: MessageEvent<any>) {
        // console.log(ev);
        const data = JSON.parse(ev.data);
        // console.log(data);
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
                break;
            }
            case 'update': {
                const players = data['players'];
                if (players === undefined) {
                    console.warn('invalid players data');
                    return;
                }
                for (const player of players) {
                    this.processPlayer(player);
                }
                break;
            }
        }
    }

    private processPlayer(playerData: any) {
        if (this.onplayerupdate === undefined) {
            console.warn('onplayerupdate not set');
            return;
        }

        const pid = playerData['pid'];
        if (pid === undefined) {
            console.warn('contains no pid information');
            return;
        }

        const updateData: {
            position?: Position,
            velocity?: Velocity
        } = {};

        const position = playerData['position'];
        if (position !== undefined) {
            updateData.position = position;
        }

        const velocity = playerData['velocity'];
        if (velocity !== undefined) {
            updateData.velocity = velocity;
        }

        this.onplayerupdate(pid, updateData);
    }
}
