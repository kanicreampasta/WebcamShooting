import * as THREE from 'three';
// import * as CANNON from 'cannon';
import "./index.css";
import { RenderingManager } from "./renderer";
import { gAmmo, PhysicsManager } from "./physics";
import { Player } from "./player";
import { NetworkClient } from './network';
import { ModelLoader } from "./model-loader";
import { appendToLog } from './utils';
import { FaceDetector } from './face-detection/facedetection';
class GameManager {
	rendering: RenderingManager;
	physics: PhysicsManager;
	players: Player[];
	playerIdMap: Map<string, Player>;
	frametime: number = 0;
	lastFrame: Date;
	keyState: KeyState = new KeyState();
	startFrame: Date;
	onload: () => void;
	loaders: ModelLoader[] = [];
	stageLoaders: ModelLoader[] = [];

	private inMagazine: HTMLElement;
	private outOfMagazine: HTMLElement;
	constructor(onload: () => void) {
		this.rendering = new RenderingManager();
		this.physics = new PhysicsManager();
		this.onload = onload;

		this.inMagazine = document.querySelector('#inMagazine');
		this.outOfMagazine = document.querySelector('#outOfMagazine');
	}
	async init() {
		await this.physics.init();
		this.initPlayer();
	}
	private initPlayer() {
		this.players = [];
		this.playerIdMap = new Map();
		this.addPlayer(new Player(this.rendering.scene, this.physics.world));
		this.generateWorld();
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
			await Promise.all(promises);
		}
		for (const ld of this.stageLoaders) {
			ld.loadStage(this.rendering.scene, this.physics.world);
		}
		this.onload();
	}
	generateWorld() {
		this.addCube(new THREE.Vector3(0, -5, 0), new THREE.Vector3(10, 1, 10), new THREE.Euler(0, 0, 0), "#f00");
		this.addCube(new THREE.Vector3(5, -5, 0), new THREE.Vector3(10, 1, 10), new THREE.Euler(45, 0, 0), "#fff");
		this.stageLoaders.push(new ModelLoader("demostage.glb"));
	}
	addCube(position: THREE.Vector3, dimention: THREE.Vector3, rotation: THREE.Euler, color?: THREE.ColorRepresentation) {
		this.rendering.addCube(position, dimention, rotation, color);
		this.physics.addCube(new gAmmo.btVector3(position.x, position.y, position.z), new gAmmo.btVector3(dimention.x, dimention.y, dimention.z), rotation);
	}
	step() {
		const currentFrame: Date = new Date();
		const dt: number = (currentFrame.getTime() - this.lastFrame.getTime()) * 0.001;
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


		this.addThrust();
		this.processGun();
		this.getMyPlayer().step(dt);
		this.physics.world.stepSimulation(dt);

		for (const p of this.players) {
			p.applyGraphics();
		}
		// const p = this.players[0].playerMesh.position;
		// console.log(p.x + ',' + p.y + ',' + p.z);
		this.rendering.setFPSCamera(this.players[0]);
		// this.rendering.setTPSCamera(this.players[0]);
		this.rendering.render();
		this.lastFrame = currentFrame;
	}
	addPlayer(player: Player, id?: string): void {
		this.players.push(player);
		if (id !== undefined) {
			this.playerIdMap.set(id, player);
		}
	}
	createNewPlayer(id: string, position: [number, number, number], velocity: [number, number]): Player {
		console.log('createNewPlayer id: ' + id);
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
			const playerToDelete = this.playerIdMap.get(id);
			playerToDelete.delete(this.rendering.scene, this.physics.world);
			this.playerIdMap.delete(id);
			const index = this.players.indexOf(playerToDelete);
			if (index !== -1) {
				this.players.splice(index, 1);
			}
		}
	}
	getMyPlayer(): Player {
		return this.players[0];
	}
	setIdOfMyPlayer(id: string): void {
		this.playerIdMap.set(id, this.getMyPlayer());
	}
	getPlayerById(id: string): Player | undefined {
		return this.playerIdMap.get(id);
	}
	mouseMove(x: number, y: number) {
		this.players[0].yaw = -x / window.innerWidth * 6;
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
			}
		} else {
			player.releaseTrigger();
			if (this.keyState.R) {
				player.requestReload();
			}
		}
		const gun = this.getMyPlayer().gun;
		this.inMagazine.textContent = gun.remainingBulletsInMagazine.toString();
		this.outOfMagazine.textContent = gun.outOfMagazine.toString();
	}
	getCanvas(): HTMLCanvasElement {
		return this.rendering.getCanvas();
	}
}
class KeyState {
	W: boolean = false;
	A: boolean = false;
	S: boolean = false;
	D: boolean = false;
	R: boolean = false;
	leftClick: boolean = false;
	toString(): string {
		return (this.W ? "W" : "") + (this.A ? "A" : "") + (this.S ? "S" : "") + (this.D ? "D" : "") + " " + (this.leftClick ? "M1" : "");
	}
}
let manager: GameManager = null;
let network: NetworkClient = null;

let internalMyVideo: HTMLVideoElement;
let faceDetector: FaceDetector;
let cameraOffscreen: HTMLCanvasElement;
let cameraOffscreenCtx: CanvasRenderingContext2D;
let previewVideo: HTMLCanvasElement;
let previewVideoCtx: CanvasRenderingContext2D;
let cameraIsOn = false;
let faceRect: null | [number, number, number, number] = null;

async function getCamera() {
	let stream = null;

	try {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true
		});
		/* ストリームを使用 */
		return stream;
	} catch (err) {
		/* エラーを処理 */
		console.error('erro in getMedia');
		throw err;
	}
}

window.onload = async function () {
	previewVideo = document.querySelector('#previewVideo');
	function loop() {
		document.getElementById("log").innerText = state.toString();
		manager.step();

		if (cameraIsOn && faceDetector.isReady) {
			// 1. draw my camera on offscreen canvas
			cameraOffscreenCtx.drawImage(internalMyVideo, 0, 0, internalMyVideo.width, internalMyVideo.height);

			// 2. get ImageData from offscreen canvas
			const imageData = cameraOffscreenCtx.getImageData(0, 0, cameraOffscreen.width, cameraOffscreen.height);

			// 3. send ImageData to worker
			faceDetector.processImageIfReady(imageData);
		}
		if (cameraIsOn) {
			// 4. extract the face part from offscreen canvas and draw it on previewVideo
			if (faceRect !== null) {
				// clear canvas
				previewVideoCtx.clearRect(0, 0, previewVideo.width, previewVideo.height);
				// extract and draw
				previewVideoCtx.drawImage(cameraOffscreen, faceRect[0], faceRect[1], faceRect[2], faceRect[3], 0, 0, previewVideo.width, previewVideo.height);
			}
		}

		requestAnimationFrame(loop);
	}
	manager = new GameManager(loop);
	await manager.init();
	network = new NetworkClient();
	const state: KeyState = new KeyState();
	// game server network
	network.initGameServer().then(() => {
		appendToLog("connected to Game Server");
		network.start(() => {
			const player = manager.players[0];
			return {
				position: player.getPosition().toArray(),
				velocity: player.getVelocity().toArray(),
				yaw: player.yaw,
				pitch: player.pitch
			};
		})
	}).catch(console.error);
	network.onplayerupdate = (pid, update) => {
		if (pid === network.myPid) return;
		const player = manager.getPlayerById(pid);
		if (player === undefined) {
			// create new player
			const position = update.position || [0, 0, 0];
			let velocity: [number, number];
			if (update.velocity === undefined) {
				velocity = [0, 0];
			} else {
				velocity = [update.velocity[0], update.velocity[2]];
			}
			const newPlayer = manager.createNewPlayer(pid, position, velocity);
			if (update.yaw !== undefined) {
				newPlayer.yaw = update.yaw;
			}
			if (update.pitch !== undefined) {
				newPlayer.pitch = update.pitch;
			}
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
		}
	};
	network.onplayerdelete = (pid) => {
		console.log(`deleted player ${pid}`);
		manager.deletePlayerById(pid);
	};
	// video server network
	network.onvideostream = (stream, pid) => {
		console.log(`got stream ${stream} for pid ${pid}`);
		if (pid === undefined) {
			appendToLog(`local stream connected`);
		} else {
			appendToLog(`got stream of player ${pid}`);
			manager.getPlayerById(pid)?.setFaceImage(stream);
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
			internalMyVideo = document.createElement('video');
			// internalMyVideo = document.querySelector('#rawVideo');
			internalMyVideo.autoplay = true;
			internalMyVideo.srcObject = stream;
			internalMyVideo.width = 300;
			internalMyVideo.height = 200;

			cameraOffscreen = document.createElement('canvas');
			// cameraOffscreen = document.querySelector('#offscreen');
			cameraOffscreenCtx = cameraOffscreen.getContext('2d');
			cameraOffscreen.width = internalMyVideo.width;
			cameraOffscreen.height = internalMyVideo.height;

			previewVideo.width = internalMyVideo.width;
			previewVideo.height = internalMyVideo.height;
			previewVideoCtx = previewVideo.getContext('2d');

			cameraIsOn = true;
			return previewVideo.captureStream();
		})
		.then(async (stream) => {
			console.log('initializing video server');
			network.setVideoStream(stream);
			await network.initVideoServer();
		});
	{
		let mouseMoveX = 0;
		let mouseMoveY = 0;
		manager.getCanvas().onmousemove = function (e: MouseEvent) {
			mouseMoveX += e.movementX;
			mouseMoveY += e.movementY;
			manager.mouseMove(mouseMoveX, mouseMoveY);
		};
	}
	manager.setKey(state);
	window.onkeydown = function (e: KeyboardEvent) {
		if (e.code == "KeyW") {
			state.W = true;
		}
		if (e.code == "KeyA") {
			state.A = true;
		}
		if (e.code == "KeyS") {
			state.S = true;
		}
		if (e.code == "KeyD") {
			state.D = true;
		}
		if (e.code == 'KeyR') {
			state.R = true;
		}
		manager.setKey(state);
	};
	window.onkeyup = function (e: KeyboardEvent) {
		if (e.code == "KeyW") {
			state.W = false;
		}
		if (e.code == "KeyA") {
			state.A = false;
		}
		if (e.code == "KeyS") {
			state.S = false;
		}
		if (e.code == "KeyD") {
			state.D = false;
		}
		if (e.code == 'KeyR') {
			state.R = false;
		}
		manager.setKey(state);
	};
	window.onmousedown = function (e) {
		if (e.button === 0) {
			state.leftClick = true;
		}
		manager.setKey(state);
	}
	window.onmouseup = function (e) {
		if (e.button === 0) {
			state.leftClick = false;
		}
		manager.setKey(state);
	}

	manager.loadGame();
};