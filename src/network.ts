import { Player } from './player';
import * as video from './video/video';

type Position = [number, number, number];
type Velocity = [number, number, number];

type PlayerGetter = () => {
    position: Position,
    velocity: Velocity,
    yaw: number,
    pitch: number,
    hp: number,
};

type DamageInfo = {
    pid: string,
    damage: number,
    afterHP: number
};

type PlayerUpdate = {
    type: 'update'
    position?: Position,
    velocity?: Velocity,
    yaw?: number,
    pitch?: number,
    fired?: boolean,
    damages?: {
        byPid: string,
        amount: number
    }[],
} | {
    type: 'killed'
} | {
    type: 'revived'
};

const GAME_SERVER = "ws://localhost:3000";
const VIDEO_SERVER = "http://localhost:5001/janus";

export class NetworkClient {
    private socket: WebSocket;
    private loopKey: NodeJS.Timer;
    private pid: string | null;
    private fired: boolean = false;
    private damageQueue: Map<string, DamageInfo> = new Map();
    private killedQueue: string[] = [];

    onplayerupdate: undefined | ((pid: string, update: PlayerUpdate) => void);

    onplayerdelete: undefined | ((pid: string) => void);

    onvideostream: undefined | video.VideoSetter;

    onmypid: undefined | ((pid: string) => void);

    setVideoStream(stream: MediaStream) {
        video.setVideoStream(stream);
    }

    constructor() {
        this.socket = null;
        this.pid = null;
    }

    async initGameServer(): Promise<void> {
        this.socket = new WebSocket(GAME_SERVER);
        this.socket.addEventListener('message', (ev) => this.onmessage(ev))
        return new Promise((resolve) => {
            this.socket.onopen = (ev) => resolve();
        });
    }

    async initVideoServer(): Promise<void> {
        video.setOnVideoStream((stream, pid) => this.onvideostream(stream, pid));
        await video.initJanus();
        if (this.pid !== undefined) {
            video.initiateSession(VIDEO_SERVER, this.pid);
        } else {
            this.onmypid = (pid) => {
                video.initiateSession(VIDEO_SERVER, pid);
            };
        }
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
        const payload: {
            pid: string,
            position: [number, number, number],
            velocity: [number, number, number],
            yaw: number,
            pitch: number,
            fired?: boolean,
            damages?: {
                pid: string,
                damage: number,
                afterHP: number
            }[],
            kills?: string[],
        } = {
            pid: this.pid,
            position: pl.position,
            velocity: pl.velocity,
            yaw: pl.yaw,
            pitch: pl.pitch,
            damages: []
        };
        if (this.fired) {
            payload['fired'] = this.fired;
            this.fired = false;
            // console.log('fire');
        }
        for (const damage of this.damageQueue.values()) {
            payload.damages.push(damage);
        }
        this.damageQueue.clear();

        if (this.killedQueue.length !== 0) {
            payload.kills = [];
            for (const killedPid of this.killedQueue) {
                payload.kills.push(killedPid);
            }
        }
        this.killedQueue = [];

        this.socket.send(JSON.stringify({
            type: 'position',
            data: payload
        }));
    }

    private onmessage(ev: MessageEvent<any>) {
        // console.log(ev);
        const data = JSON.parse(ev.data);
        // console.log(data);
        if (typeof (data) !== 'object') return;
        const type = data['type'];
        if (typeof (type) !== 'string') return;

        // console.log(ev.data.toString());

        switch (type) {
            case 'pid': {
                const pid = data['pid'];
                if (typeof (pid) !== 'string') {
                    console.warn('invalid pid data');
                    return;
                }
                this.pid = pid;
                console.log(`pid set to ${pid}`);
                if (this.onmypid !== undefined) {
                    this.onmypid(pid);
                }
                break;
            }
            case 'update': {
                const deaths = data['deaths'];
                if (deaths !== undefined) {
                    for (const death of deaths) {
                        const killer = death['killer'];
                        const killed = death['killed'];
                        console.log(`${killer} killed ${killed}`);
                        const update: PlayerUpdate = {
                            type: 'killed'
                        };
                        this.onplayerupdate(killed, update);
                    }
                }

                const revives = data['revives'];
                if (revives !== undefined) {
                    for (const revive of revives) {
                        console.log(`${revive} revived`);
                        this.onplayerupdate(revive, {
                            type: 'revived'
                        });
                    }
                }

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
            case 'leave': {
                if (this.onplayerdelete === undefined) {
                    console.warn('onplayerdelete not set');
                    return;
                }
                const pid = data['pid'];
                if (pid === undefined || typeof (pid) !== 'string') {
                    console.warn('invalid message');
                    return;
                }
                this.onplayerdelete(pid);
                break;
            }
        }
    }

    queueFired() {
        if (this.socket === undefined || this.pid === undefined) {
            return;
        }
        this.fired = true;
    }

    queueDamageOther(playerToHurt: Player, damage: number, afterHP: number) {
        const enemyPID = playerToHurt.pid;
        if (enemyPID === undefined) {
            console.warn('enemy has undefined PID');
            return;
        }
        if (!this.damageQueue.has(playerToHurt.pid)) {
            this.damageQueue.set(playerToHurt.pid, {
                pid: playerToHurt.pid,
                damage,
                afterHP
            });
        } else {
            const info = this.damageQueue.get(playerToHurt.pid);
            info.damage += damage;
            info.afterHP = afterHP;
        }
    }

    queueKill(killed: Player) {
        this.killedQueue.push(killed.pid);
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

        const updateData: PlayerUpdate = {
            type: 'update'
        };

        const position = playerData['position'];
        if (position !== undefined) {
            updateData.position = position;
        }

        const velocity = playerData['velocity'];
        if (velocity !== undefined) {
            updateData.velocity = velocity;
        }

        const yaw = playerData['yaw'];
        if (yaw !== undefined) {
            updateData.yaw = yaw;
        }

        const pitch = playerData['pitch'];
        if (pitch !== undefined) {
            updateData.pitch = pitch;
        }

        const fired = playerData['fired'];
        if (fired !== undefined) {
            updateData.fired = fired;
        }

        const damages = playerData['damages'];
        if (damages !== undefined) {
            updateData.damages = damages;
        }

        this.onplayerupdate(pid, updateData);
    }
}
