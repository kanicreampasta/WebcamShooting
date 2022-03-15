import * as THREE from 'three';
import * as CANNON from "cannon";
import "./index.css";
import { RenderingManager } from "./renderer";
import { PhysicsManager } from "./physics";
import { Player } from "./player";
class GameManager {
	rendering: RenderingManager;
	physics: PhysicsManager;
	players: Player[];
	frametime: number = 0;
	lastFrame: Date;
	keyState: KeyState = new KeyState();
	constructor() {
		this.rendering = new RenderingManager();
		this.physics = new PhysicsManager();
		this.players = [new Player(this.rendering.scene, this.physics.world)];
		this.generateWorld();
		this.lastFrame = new Date();
	}
	generateWorld() {
		this.addCube(new THREE.Vector3(0, -5, 0), new THREE.Vector3(10, 1, 10), new THREE.Euler(0, 0, 0));
		this.addCube(new THREE.Vector3(5, -5, 0), new THREE.Vector3(10, 1, 10), new THREE.Euler(45, 0, 0));
	}
	addCube(position: THREE.Vector3, dimention: THREE.Vector3, rotation: THREE.Euler) {
		this.rendering.addCube(position, dimention, rotation);
		this.physics.addCube(new CANNON.Vec3(position.x, position.y, position.z), new CANNON.Vec3(dimention.x, dimention.y, dimention.z), rotation);
	}
	step() {
		const currentFrame: Date = new Date();
		const dt: number = (currentFrame.getTime() - this.lastFrame.getTime()) * 0.001;
		this.players[0].applyGraphics();
		this.rendering.setFPSCamera(this.players[0]);
		this.addThrust();
		this.physics.world.step(dt);
		this.rendering.render();
		this.lastFrame = currentFrame;
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
		this.players[0].walk(v.x, v.z);
	}
}
class KeyState {
	W: boolean = false;
	A: boolean = false;
	S: boolean = false;
	D: boolean = false;
	toString(): string {
		return (this.W ? "W" : "") + (this.A ? "A" : "") + (this.S ? "S" : "") + (this.D ? "D" : "");
	}
}
let manager: GameManager = null;
window.onload = function () {
	manager = new GameManager();
	function loop() {
		document.getElementById("log").innerText = state.toString();
		manager.step();
		requestAnimationFrame(loop);
	}
	const state: KeyState = new KeyState();
	loop();
	window.onmousemove = function (e: MouseEvent) {
		manager.mouseMove(e.clientX, e.clientY);
	};
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
		manager.setKey(state);
	};
};