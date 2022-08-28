import { Player } from "./player";
import * as video from "./video/video";
import { webcamshooting as types } from "./game.pb";
import { v4 as uuidv4 } from "uuid";
import { update } from "lodash";

type Position = [number, number, number];
type Velocity = [number, number, number];

type PlayerGetter = () => {
  position: Position;
  velocity: Velocity;
  yaw: number;
  pitch: number;
  hp: number;
};

type DamageInfo = {
  pid: string;
  damage: number;
  afterHP: number;
};

type PlayerUpdate = {
  position?: Position;
  velocity?: Velocity;
  yaw?: number;
  pitch?: number;
  fired?: boolean;
  damages?: {
    byPid: string;
    amount: number;
  }[];
};

const GAME_SERVER = "ws://localhost:5000";
const VIDEO_SERVER = "http://localhost:5001/janus";

export abstract class InstantEvent {
  abstract send(client: NetworkClient): void;
}

export class DeadEvent extends InstantEvent {
  send(client: NetworkClient) {
    const req = types.DeadUpdate.create({
      pid: client.pid,
    });
    const msg = types.Request.create({
      deadUpdate: req,
    });
    client.send(types.Request.encode(msg).finish());
  }
}

export class RespawnEvent extends InstantEvent {
  private pos: Position;

  constructor(pos: Position) {
    super();
    this.pos = pos;
  }

  send(client: NetworkClient) {
    const req = types.RespawnRequest.create({
      pid: client.pid,
      position: types.Vector3.create({
        x: this.pos[0],
        y: this.pos[1],
        z: this.pos[2],
      }),
    });
    const msg = types.Request.create({
      respawnRequest: req,
    });
    client.send(types.Request.encode(msg).finish());
  }
}

export class NetworkClient {
  private socket?: WebSocket;
  private loopKey?: NodeJS.Timer;
  pid: string | null;

  private fired: boolean = false;
  private damageQueue: Map<string, DamageInfo> = new Map();
  private eventQueue: InstantEvent[] = [];

  onplayerupdate: undefined | ((pid: string, update: PlayerUpdate) => void);
  onplayerPidsUpdate: undefined | ((pids: string[]) => void);

  onplayerdelete: undefined | ((pid: string) => void);

  onvideostream: undefined | video.VideoSetter;

  onmypid: undefined | ((pid: string) => void);

  setVideoStream(stream: MediaStream) {
    video.setVideoStream(stream);
  }

  constructor() {
    this.socket = undefined;
    this.pid = null;
  }

  async initGameServer(): Promise<void> {
    this.socket = new WebSocket(GAME_SERVER);
    this.socket.addEventListener(
      "message",
      async (ev) => await this.onmessage(ev)
    );
    return new Promise((resolve) => {
      this.socket!.onopen = (ev) => resolve();
    });
  }

  async initVideoServer(): Promise<void> {
    video.setOnVideoStream((stream, pid) => {
      if (this.onvideostream) {
        this.onvideostream(stream, pid);
      }
    });
    await video.initJanus();
    if (this.pid !== null) {
      video.initiateSession(VIDEO_SERVER, this.pid);
    } else {
      this.onmypid = (pid) => {
        video.initiateSession(VIDEO_SERVER, pid);
      };
    }
  }

  start(getPlayer: PlayerGetter) {
    const requestJoin = types.JoinRequest.create({
      name: "testusername",
    });
    const req = types.Request.create({
      joinRequest: requestJoin,
    });
    this.socket!.send(types.Request.encode(req).finish());
    this.loopKey = setInterval(() => this.loop(getPlayer), 1000 / 30);
  }

  stop() {
    clearInterval(this.loopKey!);
  }

  public get myPid(): string {
    return this.pid!;
  }

  private processInstantEvents() {
    for (const event of this.eventQueue) {
      event.send(this);
    }
    if (this.eventQueue.length > 0) {
      this.eventQueue = [];
    }
  }

  private loop(getPlayer: PlayerGetter) {
    if (this.pid === null) return;

    this.processInstantEvents();

    const pl = getPlayer();

    const u: types.IClientUpdate = {
      pid: this.pid,
      player: types.Player.create({
        position: types.Vector3.create({
          x: pl.position[0],
          y: pl.position[1],
          z: pl.position[2],
        }),
        velocity: types.Vector3.create({
          x: pl.velocity[0],
          y: pl.velocity[1],
          z: pl.velocity[2],
        }),
        pitch: pl.pitch,
        yaw: pl.yaw,
      }),
    };
    if (this.fired) {
      u.fired = true;
      this.fired = false;
      // console.log('fire');
    }
    if (this.damageQueue.size > 0) {
      u.damages = [];
    }
    for (const damage of this.damageQueue.values()) {
      u.damages!.push(
        types.Damage.create({
          pid: damage.pid,
          damage: damage.damage,
        })
      );
    }
    this.damageQueue.clear();

    const update = types.ClientUpdate.create(u);
    const req = types.Request.create({
      clientUpdate: update,
    });

    this.socket!.send(types.Request.encode(req).finish());
  }

  send(
    data: Parameters<NonNullable<NetworkClient["socket"]>["send"]>[0]
  ): void {
    this.socket!.send(data);
  }

  private async onmessage(ev: MessageEvent<any>) {
    const bin: Blob = ev.data;
    const buf = await bin.arrayBuffer();
    const ary = new Uint8Array(buf);
    const res = types.Response.decode(ary);
    if (res.pidResponse) {
      const pid = res.pidResponse!.pid!;
      console.log(`got pid from server: ${pid}`);
      this.pid = pid;
      if (this.onmypid) {
        this.onmypid(pid);
      }
    } else if (res.updateResponse) {
      const update = res.updateResponse!;
      for (const player of update.players!) {
        this.processPlayer(player);
      }
      const pids = update.players!.map((p) => p.pid!);
      if (this.onplayerPidsUpdate) {
        this.onplayerPidsUpdate(pids);
      } else {
        console.log("onplayerPidsUpdate is not set");
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
      console.warn("enemy has undefined PID");
      return;
    }
    if (!this.damageQueue.has(playerToHurt.pid!)) {
      this.damageQueue.set(playerToHurt.pid!, {
        pid: playerToHurt.pid!,
        damage,
        afterHP,
      });
    } else {
      const info = this.damageQueue.get(playerToHurt.pid!);
      info!.damage += damage;
      info!.afterHP = afterHP;
    }
  }

  queueInstantEvent(ev: InstantEvent) {
    this.eventQueue.push(ev);
  }

  private convertVector3(v: types.IVector3): [number, number, number] {
    return [v.x!, v.y!, v.z!];
  }

  private processPlayer(playerData: types.IPlayerUpdateResponse) {
    if (this.onplayerupdate === undefined) {
      console.warn("onplayerupdate not set");
      return;
    }

    const pid = playerData["pid"];
    if (pid === undefined || pid === null) {
      console.warn("contains no pid information");
      return;
    }

    const updateData: PlayerUpdate = {};

    updateData.position = this.convertVector3(playerData.player?.position!);

    updateData.velocity = this.convertVector3(playerData.player?.velocity!);

    updateData.yaw = playerData.player!.yaw!;
    updateData.pitch = playerData.player!.pitch!;

    updateData.fired = playerData.fired!;

    const damages = playerData.damages;
    if (damages) {
      updateData.damages = [];
      for (const damage of damages) {
        updateData.damages.push({
          byPid: damage.by!,
          amount: damage.amount!,
        });
      }
    }

    this.onplayerupdate(pid, updateData);
  }
}
