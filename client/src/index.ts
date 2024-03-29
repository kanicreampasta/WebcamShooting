import * as THREE from "three";
// import * as CANNON from 'cannon';
import "./index.css";
import { RenderingManager } from "./renderer";
import { gAmmo, PhysicsManager } from "./physics";
import { Player } from "./player";
import { DeadEvent, NetworkClient, RespawnEvent } from "./network";
import { ModelLoader } from "./model-loader";
import { appendToLog } from "./utils";
import { FaceDetector } from "./face-detection/facedetection";
import { AudioManager } from "./audio";
import * as _ from "lodash";

export let gPlayers: Player[];

const RESPAWN_WAIT_TIME = 5;

type PlayerOperation = (player: Player) => void;

class GameManager {
  rendering: RenderingManager;
  physics: PhysicsManager;
  players: Player[] = [];
  playerIdMap: Map<string, Player> = new Map();
  private currentHitPlayer: Player | undefined;
  frametime: number = 0;
  lastFrame: Date = new Date();
  keyState: KeyState = new KeyState();
  previousKeyState: KeyState = new KeyState();
  startFrame: Date = new Date();
  onload: () => void;
  loaders: { [key: string]: ModelLoader } = {};
  stageLoaders: ModelLoader[] = [];
  audio?: AudioManager;

  view: number = 0; //0:fps 1:tps

  private inMagazine: HTMLElement;
  private outOfMagazine: HTMLElement;

  private fleshHealthBar: HTMLElement;
  private fleshRemainingBar: HTMLElement;
  private fleshRemainingNumber: HTMLElement;

  private hitIndicatorTimer = -1;
  private hitIndicatorDuration = 0.3;

  private damageEffectTimer = -1;
  private damageEffectDuration = 0.2;

  private effectCanvas: HTMLCanvasElement;
  private effectCanvasCtx: CanvasRenderingContext2D;

  private respawnTimer: number = -1;

  constructor(onload: () => void) {
    this.rendering = new RenderingManager();
    this.physics = new PhysicsManager();
    this.onload = onload;

    this.inMagazine = document.querySelector("#inMagazine")!;
    this.outOfMagazine = document.querySelector("#outOfMagazine")!;
    this.fleshHealthBar = document.querySelector("#flesh-health")!;
    this.fleshRemainingBar = document.querySelector("#flesh-remaining-bar")!;
    this.fleshRemainingNumber = document.querySelector("#flesh-remaining")!;
    this.effectCanvas = document.querySelector("#effectCanvas")!;
    this.effectCanvasCtx = this.effectCanvas.getContext("2d")!;
    this.startLoadingModels();

    const mainCanvas = this.getCanvas();
    this.effectCanvas.width = mainCanvas.width;
    this.effectCanvas.height = mainCanvas.height;
  }

  private initPlayer() {
    this.players = [];
    gPlayers = this.players;
    this.playerIdMap = new Map();
    this.addPlayer(new Player(this.rendering.scene, this.physics.world));
    this.lastFrame = new Date();
    //add test online player
    // this.addPlayer(new Player(this.rendering.scene, this.physics.world, true));
    this.startFrame = new Date();
    this.players[0].warp(0, 20, 0);
  }

  async loadGame() {
    {
      const promises: Promise<any>[] = this.stageLoaders.map((ld) => {
        return ld.loadModel();
      });
      for (const key in this.loaders) {
        promises.push(this.loaders[key].loadModel());
      }
      await Promise.all(promises);
    }
    await this.physics.init();
    for (const ld of this.stageLoaders) {
      ld.loadStage(this.rendering.scene, this.physics.world);
    }
    this.initPlayer();

    this.onload();
  }

  startLoadingModels() {
    this.stageLoaders.push(
      new ModelLoader("WebcamShootingMaps/IndiaPro/stage.glb")
    );
    this.loaders["human"] = new ModelLoader("human.glb");
  }

  addCube(
    position: THREE.Vector3,
    dimention: THREE.Vector3,
    rotation: THREE.Euler,
    color?: THREE.ColorRepresentation
  ) {
    this.rendering.addCube(position, dimention, rotation, color);
    this.physics.addCube(
      new gAmmo.btVector3(position.x, position.y, position.z),
      new gAmmo.btVector3(dimention.x, dimention.y, dimention.z),
      rotation
    );
  }

  step() {
    const currentFrame: Date = new Date();
    const dt: number =
      (currentFrame.getTime() - this.lastFrame.getTime()) * 0.001;
    // const time: number = (currentFrame.getTime() - this.startFrame.getTime()) * 0.001;
    // if (time > 8) {
    // 	if (this.players.length >= 3) {
    // 		console.log(this.players.length);
    // 		this.deletePlayerByIndex(1);
    // 		console.log(this.players.length);
    // 		console.log(this.players);
    // 	}
    // } else if (time > 3) {
    // 	if (this.players.length < 3) {
    // 		var newenemy: Player = new Player(this.rendering.scene, this.physics.world, true);
    // 		this.addPlayer(newenemy);
    // 		newenemy.vx = 1;
    // 	}
    // } else {
    // 	if (Math.random() < 1 - Math.exp(-dt)) {
    // 		this.players[1].warp(1, 0, 0);
    // 	}
    // }
    if (this.keyState.C && !this.previousKeyState.C) {
      this.view = (this.view + 1) % 2;
    }

    const player = this.getMyPlayer();
    if (player.isDead()) {
      // console.log("reaspwn timer", this.respawnTimer);
      this.respawnTimer -= dt;
      if (this.respawnTimer < 0) {
        this.respawnTimer = -1;

        const initPosition = [0, 20, 0] as [number, number, number];
        const initHealth = 51;

        network!.queueInstantEvent(new RespawnEvent(initPosition));

        player.warp(...initPosition);
        player.setHealth(initHealth);

        this.rendering.enableView("alive");
      } else {
        this.rendering.updateRespawnTimerText(this.respawnTimer);
      }
    } else {
      this.aliveProcess(dt, currentFrame);
    }
    this.lastFrame = currentFrame;
  }

  private aliveProcess(dt: number, currentFrame: Date) {
    this.addThrust();
    this.processGun();
    // this.updateHealth();
    this.getMyPlayer().jumping = this.keyState.Space;
    this.getMyPlayer().step(dt);
    // const pl = this.getMyPlayer().getPosition();
    // console.log('pl ' + pl.x + ',' + pl.y + ',' + pl.z);
    this.physics.world.stepSimulation(dt);

    for (const p of this.players) {
      p.applyGraphics();
      p.applyHitTestBody();
    }
    // const p = this.players[0].playerMesh.position;
    // console.log(p.x + ',' + p.y + ',' + p.z);
    switch (this.view) {
      case 0:
        this.rendering.setFPSCamera(this.players[0]);
        break;
      case 1:
        this.rendering.setTPSCamera(this.players[0]);
        break;
    }
    this.players[0].applyGun();

    const hitPlayer = this.players[0].gun!.test(100, this.physics.world);
    if (hitPlayer !== null) {
      this.currentHitPlayer = hitPlayer;
    } else {
      this.currentHitPlayer = undefined;
    }

    this.updateHealth(this.damageInNextStep);
    this.damageInNextStep = 0;

    this.hitIndicatorTimer -= dt;
    if (this.hitIndicatorTimer < 0) {
      hitIndicator.style.display = "none";
    }

    // this.rendering.setTPSCamera(this.players[0]);
    this.rendering.render();

    this.drawDamageEffect(dt);

    this.previousKeyState = _.cloneDeep(this.keyState);
  }

  private drawDamageEffect(dt: number) {
    this.effectCanvasCtx.clearRect(
      0,
      0,
      this.effectCanvas.width,
      this.effectCanvas.height
    );
    if (this.damageEffectTimer > 0) {
      const alpha = this.damageEffectTimer / this.damageEffectDuration;
      const grad = this.effectCanvasCtx.createRadialGradient(
        this.effectCanvas.width / 2,
        this.effectCanvas.height / 2,
        this.effectCanvas.width / 5,
        this.effectCanvas.width / 2,
        this.effectCanvas.height / 2,
        this.effectCanvas.width / 2
      );
      grad.addColorStop(0, "rgba(255,0,0,0)");
      grad.addColorStop(1, "rgba(255,0,0," + alpha + ")");

      this.effectCanvasCtx.fillStyle = grad;
      this.effectCanvasCtx.fillRect(
        0,
        0,
        this.effectCanvas.width,
        this.effectCanvas.height
      );
      this.damageEffectTimer -= dt;
    }
  }

  addPlayer(player: Player, id?: string): void {
    this.players.push(player);
    if (id !== undefined) {
      this.playerIdMap.set(id, player);
    }
    player.loadHuman(this.loaders["human"], this.physics.world);

    let remainingOperations: typeof this.operationQueue = [];
    for (const op of this.operationQueue) {
      if (op.id === id) {
        op.f(player);
      } else {
        remainingOperations.push(op);
      }
    }
    this.operationQueue = remainingOperations;
  }

  createNewPlayer(
    id: string,
    position: [number, number, number],
    velocity: [number, number]
  ): Player {
    console.log("createNewPlayer id: " + id);
    const player = new Player(this.rendering.scene, this.physics.world, true);
    player.warp(position[0], position[1], position[2]);
    player.vx = velocity[0];
    player.vz = velocity[1];
    this.addPlayer(player, id);
    return player;
  }

  deletePlayerByIndex(index: number): void {
    this.players[index].delete(this.rendering.scene, this.physics.world);
    const deleted = this.players.splice(index, 1)[0];
    for (const [k, v] of this.playerIdMap) {
      if (v === deleted) {
        this.playerIdMap.delete(k);
        break;
      }
    }
  }

  deletePlayerById(id: string): void {
    if (this.playerIdMap.has(id)) {
      const playerToDelete = this.playerIdMap.get(id)!;
      playerToDelete.delete(this.rendering.scene, this.physics.world);
      this.playerIdMap.delete(id);
      const index = this.players.indexOf(playerToDelete);
      if (index !== -1) {
        this.players.splice(index, 1);
      }
    }
  }

  removePlayerFromWorldById(id: string): void {}

  addPlayerToWorldById(id: string): void {}

  getMyPlayer(): Player {
    return this.players[0];
  }

  setIdOfMyPlayer(id: string): void {
    this.playerIdMap.set(id, this.getMyPlayer());
  }

  getPlayerById(id: string): Player | undefined {
    return this.playerIdMap.get(id);
  }

  private operationQueue: {
    id: string;
    f: PlayerOperation;
  }[] = [];
  queuePlayerOperation(id: string, f: PlayerOperation): void {
    const player = this.getPlayerById(id);
    if (player !== undefined) {
      f(player);
    } else {
      console.log(`pid ${id} not found, queued operation`);
      this.operationQueue.push({ id, f });
    }
  }

  mouseMove(x: number, y: number) {
    if (this.players.length === 0) return;
    this.players[0].yaw = (-x / window.innerWidth) * 6;
    this.players[0].pitch = -(y / window.innerHeight - 0.5) * Math.PI;
  }

  setKey(state: KeyState) {
    this.keyState = state;
  }

  addThrust() {
    const v = new THREE.Vector3(0, 0, 0);
    if (this.keyState.W) {
      v.z = 1;
    }
    if (this.keyState.S) {
      v.z = -1;
    }
    if (this.keyState.A) {
      v.x = -1;
    }
    if (this.keyState.D) {
      v.x = 1;
    }
    for (let i = 0; i < this.players.length; i++) {
      if (i === 0) {
        // player
        this.players[i].walk(v.x, v.z, this.physics.world);
      } else {
        // enemy
        this.players[i].walk(v.x, v.z, this.physics.world);
      }
    }
  }

  private processGun() {
    const player = this.getMyPlayer();
    if (this.keyState.leftClick) {
      if (player.triggerGun()) {
        console.log("gun");
        this.audio!.playSound("gunshot");
        network!.queueFired();

        if (this.currentHitPlayer !== undefined) {
          const damage = 5;
          this.currentHitPlayer.gotDamage(damage);
          network!.queueDamageOther(
            this.currentHitPlayer,
            damage,
            this.currentHitPlayer.health.remainingHealth
          );
          hitIndicator.style.display = "block";
          this.hitIndicatorTimer = this.hitIndicatorDuration;
        }
      }
    } else {
      player.releaseTrigger();
      if (this.keyState.R) {
        if (player.requestReload()) {
          this.audio!.playSound("reload");
        }
      }
    }
    const gun = this.getMyPlayer().gun!;
    this.inMagazine.textContent = gun.remainingBulletsInMagazine.toString();
    this.outOfMagazine.textContent = gun.outOfMagazine.toString();
  }

  private damageInNextStep: number = 0;
  hurtPlayer(damage: number) {
    this.damageInNextStep += damage;
    this.startDamageEffect();
  }

  private updateHealth(damageAmount = 0, healAmount = 0) {
    const player = this.getMyPlayer();
    player.gotDamage(damageAmount, true);
    player.gotHeal(healAmount);

    // Calculate for health bar
    const maxFleshHealth = player.health.getMaxHealthValue();
    const currentFleshHealth = player.health.remainingHealth;
    this.fleshRemainingBar.style.width =
      (currentFleshHealth / maxFleshHealth) * 100 + "%";
    this.fleshRemainingNumber.innerText =
      currentFleshHealth + "/" + maxFleshHealth;

    // check if dead
    if (player.isDead()) {
      this.deathProcess();
    }
  }

  private deathProcess() {
    network!.queueInstantEvent(new DeadEvent());
    this.respawnTimer = RESPAWN_WAIT_TIME;

    this.rendering.enableView("dead");
  }

  getCanvas(): HTMLCanvasElement {
    return this.rendering.getCanvas();
  }

  private startDamageEffect() {
    this.damageEffectTimer = this.damageEffectDuration;
  }

  keepOrRemovePlayers(keptPlayerPids: Set<string>) {
    if (keptPlayerPids.size === this.players.length) return;
    // remove players whose pid is not in keptPlayerPids
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.pid !== undefined) {
        if (!keptPlayerPids.has(player.pid)) {
          console.log("remove player from world: " + player.pid);
          this.deletePlayerByIndex(i);
          i--;
        }
      }
    }
  }
}
class KeyState {
  W: boolean = false;
  A: boolean = false;
  S: boolean = false;
  D: boolean = false;
  R: boolean = false;
  C: boolean = false;
  Space: boolean = false;
  leftClick: boolean = false;
  toString(): string {
    let result: string = "";
    const alias: { [key: string]: string } = {
      leftClick: "M1",
    };
    for (const key in this) {
      if (key == "toString") {
        continue;
      }
      let name: string = key;
      if (key in alias) {
        name = alias[key];
      }
      result += this[key] ? name : "";
    }
    return result;
    // return (this.W ? "W" : "") + (this.A ? "A" : "") + (this.S ? "S" : "") + (this.D ? "D" : "") + (this.C ? "C" : "") + " " + (this.leftClick ? "M1" : "");
  }
}
let manager: GameManager | null = null;
export let network: NetworkClient | null = null;
let audioMgr: AudioManager | null = null;

let internalMyVideo: HTMLVideoElement;
let faceDetector: FaceDetector;
let cameraOffscreen: HTMLCanvasElement;
let cameraOffscreenCtx: CanvasRenderingContext2D;
let previewVideo: HTMLCanvasElement;
let previewVideoCtx: CanvasRenderingContext2D;
let cameraIsOn = false;
let faceRect: null | [number, number, number, number] = null;

let hitIndicator: HTMLDivElement;

const soundsToLoad: { [key: string]: string } = {
  gunshot: "gunshot.ogg",
  reload: "reload.ogg",
};

async function getCamera() {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    /* ストリームを使用 */
    return stream;
  } catch (err) {
    /* エラーを処理 */
    console.error("erro in getMedia");
    throw err;
  }
}

window.onload = async function () {
  previewVideo = document.querySelector("#previewVideo")!;
  hitIndicator = document.querySelector("#hitIndicator")!;
  function loop() {
    document.getElementById("log")!.innerText = pressState.toString();
    manager!.step();

    if (cameraIsOn && faceDetector.isReady) {
      // 1. draw my camera on offscreen canvas
      cameraOffscreenCtx.drawImage(
        internalMyVideo,
        0,
        0,
        internalMyVideo.width,
        internalMyVideo.height
      );

      // 2. get ImageData from offscreen canvas
      const imageData = cameraOffscreenCtx.getImageData(
        0,
        0,
        cameraOffscreen.width,
        cameraOffscreen.height
      );

      // 3. send ImageData to worker
      faceDetector.processImageIfReady(imageData);
    }
    if (cameraIsOn) {
      // 4. extract the face part from offscreen canvas and draw it on previewVideo
      if (faceRect !== null) {
        // clear canvas
        previewVideoCtx.clearRect(
          0,
          0,
          previewVideo.width,
          previewVideo.height
        );
        // extract and draw
        previewVideoCtx.drawImage(
          cameraOffscreen,
          faceRect[0],
          faceRect[1],
          faceRect[2],
          faceRect[3],
          0,
          0,
          previewVideo.width,
          previewVideo.height
        );
      }
    }

    requestAnimationFrame(loop);
  }
  manager = new GameManager(loop);
  network = new NetworkClient();
  audioMgr = new AudioManager();
  manager.audio = audioMgr;
  const pressState: KeyState = new KeyState();
  // initialize audio
  for (const name in soundsToLoad) {
    try {
      await audioMgr.fetchSound(name, soundsToLoad[name]);
    } catch (e) {
      console.warn(e);
    }
  }
  // game server network
  manager.loadGame().then(() => {
    network!
      .initGameServer()
      .then(() => {
        appendToLog("connected to Game Server");
        network!.start(() => {
          const player = manager!.players[0];
          return {
            position: player.getPosition().toArray(),
            velocity: player.getVelocity().toArray(),
            yaw: player.yaw,
            pitch: player.pitch,
            hp: player.health.remainingHealth,
          };
        });
      })
      .catch(console.error);
  });
  network.onplayerupdate = (pid, update) => {
    if (pid === network!.myPid) {
      // 自分自身の場合はdamageのみ取得
      // const player = manager!.getMyPlayer();
      if (update !== undefined) {
        let totalDamage = 0;
        update.damages!.forEach((d) => (totalDamage += d.amount));
        // console.log(totalDamage);
        if (totalDamage !== 0) {
          manager!.hurtPlayer(totalDamage);
        }
      }
      return;
    }
    const player = manager!.getPlayerById(pid);
    if (player === undefined) {
      // create new player
      const position = update.position || [0, 0, 0];
      let velocity: [number, number];
      if (update.velocity === undefined) {
        velocity = [0, 0];
      } else {
        velocity = [update.velocity[0], update.velocity[2]];
      }
      const newPlayer = manager!.createNewPlayer(pid, position, velocity);
      if (update.yaw !== undefined) {
        newPlayer.yaw = update.yaw;
      }
      if (update.pitch !== undefined) {
        newPlayer.pitch = update.pitch;
      }
      newPlayer.pid = pid;
    } else {
      // move existing player
      if (update.velocity !== undefined) {
        player.vx = update.velocity[0];
        player.vz = update.velocity[2];
      }
      if (update.position !== undefined) {
        const p = update.position;
        player.warp(p[0], p[1], p[2]);
      }
      if (update.yaw !== undefined) {
        player.yaw = update.yaw;
      }
      if (update.pitch !== undefined) {
        player.pitch = update.pitch;
      }
      if (update.fired !== undefined && update.fired) {
        const relpos = player.getPosition();
        relpos.sub(manager!.getMyPlayer().getPosition());
        audioMgr!.playSound3D("gunshot", relpos.toArray());
      }
    }
  };
  network.onplayerPidsUpdate = (pids) => {
    // remove left players
    manager?.keepOrRemovePlayers(new Set(pids));
  };
  network.onplayerdelete = (pid) => {
    console.log(`deleted player ${pid}`);
    manager!.deletePlayerById(pid);
  };
  // video server network
  network.onvideostream = (stream, pid) => {
    console.log(`got stream ${stream?.id} for pid ${pid}`);
    if (pid === undefined) {
      appendToLog(`local stream connected`);
    } else {
      appendToLog(`got stream of player ${pid}`);
      manager!.queuePlayerOperation(pid, (targetPlayer) => {
        targetPlayer.setFaceImage(stream!);
      });
    }
  };
  getCamera()
    .then((stream) => {
      // my video
      appendToLog(`got my video stream`);
      if (faceDetector === undefined) {
        faceDetector = new FaceDetector();
        faceDetector.init();
        faceDetector.onfacedetection = (rect) => {
          faceRect = rect === undefined ? null : rect;
        };
      }
      internalMyVideo = document.createElement("video");
      // internalMyVideo = document.querySelector('#rawVideo');
      internalMyVideo.autoplay = true;
      internalMyVideo.srcObject = stream;
      internalMyVideo.width = 300;
      internalMyVideo.height = 200;

      cameraOffscreen = document.createElement("canvas");
      // cameraOffscreen = document.querySelector('#offscreen');
      cameraOffscreenCtx = cameraOffscreen.getContext("2d")!;
      cameraOffscreen.width = internalMyVideo.width;
      cameraOffscreen.height = internalMyVideo.height;

      previewVideo.width = internalMyVideo.width;
      previewVideo.height = internalMyVideo.height;
      previewVideoCtx = previewVideo.getContext("2d")!;

      cameraIsOn = true;
      return previewVideo.captureStream();
    })
    .then(async (stream) => {
      console.log("initializing video server");
      await network!.initVideoServer(stream);
    });
  {
    let mouseMoveX = 0;
    let mouseMoveY = 0;
    manager.getCanvas().onmousemove = function (e: MouseEvent) {
      mouseMoveX += e.movementX;
      mouseMoveY += e.movementY;
      manager!.mouseMove(mouseMoveX, mouseMoveY);
    };
  }
  manager.setKey(pressState);
  window.onkeydown = function (e: KeyboardEvent) {
    if (e.code == "KeyW") {
      pressState.W = true;
    }
    if (e.code == "KeyA") {
      pressState.A = true;
    }
    if (e.code == "KeyS") {
      pressState.S = true;
    }
    if (e.code == "KeyD") {
      pressState.D = true;
    }
    if (e.code == "KeyR") {
      pressState.R = true;
    }
    if (e.code == "KeyC") {
      pressState.C = true;
    }
    if (e.code == "Space") {
      pressState.Space = true;
    }
    manager!.setKey(pressState);
  };
  window.onkeyup = function (e: KeyboardEvent) {
    if (e.code == "KeyW") {
      pressState.W = false;
    }
    if (e.code == "KeyA") {
      pressState.A = false;
    }
    if (e.code == "KeyS") {
      pressState.S = false;
    }
    if (e.code == "KeyD") {
      pressState.D = false;
    }
    if (e.code == "KeyR") {
      pressState.R = false;
    }
    if (e.code == "KeyC") {
      pressState.C = false;
    }
    if (e.code == "Space") {
      pressState.Space = false;
    }
    manager!.setKey(pressState);
  };
  window.onmousedown = function (e) {
    if (e.button === 0) {
      pressState.leftClick = true;
    }
    manager!.setKey(pressState);
  };
  window.onmouseup = function (e) {
    if (e.button === 0) {
      pressState.leftClick = false;
    }
    manager!.setKey(pressState);
  };
};
