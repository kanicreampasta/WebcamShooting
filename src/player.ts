import { gAmmo } from './physics';
// import * as CANNON from 'cannon';
import * as THREE from 'three';
import Ammo from './@types/ammo';
import { Gun } from './gun';
import { PlayerHealth } from "./health";
import { ModelLoader } from "./model-loader";
import { network } from './index';

function GetPlayerBody(): Ammo.btRigidBody {
	const playerShape = new gAmmo.btCompoundShape();
	for (let i = -1; i <= 1; i++) {
		const shape = new gAmmo.btSphereShape(0.5);
		const position = new gAmmo.btVector3(0, 0.5 * i, 0);
		const transform = new gAmmo.btTransform();
		transform.setIdentity();
		transform.setOrigin(position);
		playerShape.addChildShape(transform, shape);
	}
	const mass = 1;
	const localInertia = new gAmmo.btVector3(0, 0, 0);
	playerShape.calculateLocalInertia(mass, localInertia);

	const transform = new gAmmo.btTransform();
	transform.setIdentity();
	const motionState = new gAmmo.btDefaultMotionState(transform);
	const rbInfo = new gAmmo.btRigidBodyConstructionInfo(mass, motionState, playerShape, localInertia);

	const body = new gAmmo.btRigidBody(rbInfo);
	body.setFriction(0);
	body.setRestitution(0);
	// disable sleep
	body.setSleepingThresholds(0, 0);
	// let mat = new CANNON.Material('capsuleMat');
	// playerBody.material = mat;

	// freeze rotation
	const angularFactor = new gAmmo.btVector3(0, 0, 0);
	body.setAngularFactor(angularFactor);

	// playerBody.collisionFilterMask = 1;
	// playerBody.collisionFilterGroup = 2;
	// playerBody.updateMassProperties();

	return body;
}

const collisionSphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, transparent: true, opacity: 0.1, wireframe: true });
function GetPlayerMesh(): [THREE.Object3D, THREE.Mesh] {
	const playerMesh: THREE.Object3D = new THREE.Object3D();
	for (let i: number = -1; i <= -1; i++) {
		const sphere: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5), collisionSphereMaterial);
		sphere.position.set(0, i * 0.5, 0);
		playerMesh.add(sphere);
	}
	const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshNormalMaterial());
	screen.position.set(0, 0.5, -0.5);
	screen.rotation.y = Math.PI;
	playerMesh.add(screen);
	return [playerMesh, screen];
}
function GetOtherPlayerMesh(): [THREE.Object3D, THREE.Mesh] {
	const playerMesh: THREE.Object3D = new THREE.Object3D();
	for (let i: number = -1; i <= 1; i++) {
		const sphere: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5), collisionSphereMaterial);
		sphere.position.set(0, i * 0.5, 0);
		playerMesh.add(sphere);
	}
	const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshNormalMaterial());
	screen.position.set(0, 0.5, -0.5);
	screen.rotation.y = Math.PI;
	playerMesh.add(screen);
	return [playerMesh, screen];
}

let gCollisionTestBodyIndex = 1;

export class Player {
	rigidbody: Ammo.btRigidBody;
	playerMesh: THREE.Object3D;
	playerScreen: THREE.Mesh;
	hitTestBody: Ammo.btRigidBody;
	yaw: number = 0;
	pitch: number = 0;
	isOtherPlayer: boolean = false;
	//used for online players
	//global coordinate
	vx: number = 0;
	vz: number = 0;

	pid: string | undefined;

	gun: Gun | null;
	private lastShotTime: number = 0;
	private triggered: boolean = false;
	private reloadTimer: number = -1;

	health: PlayerHealth;

	constructor(scene: THREE.Scene, world: Ammo.btDiscreteDynamicsWorld, isOtherPlayer?: boolean) {
		this.rigidbody = GetPlayerBody();
		if (isOtherPlayer) {
			const mesh = GetOtherPlayerMesh();
			this.playerMesh = mesh[0];
			this.playerScreen = mesh[1];
		} else {
			const mesh = GetPlayerMesh();
			this.playerMesh = mesh[0];
			this.playerScreen = mesh[1];
		}
		scene.add(this.playerMesh);
		const collisionFilterMask = 1;
		const collisionFilterGroup = 2;
		world.addRigidBody(this.rigidbody, collisionFilterGroup, collisionFilterMask);
		this.isOtherPlayer = isOtherPlayer;

		this.gun = new Gun(30, {
			type: 'auto',
			rate: 6
		}, 3);
		this.gun.outOfMagazine = Infinity;

		this.health = new PlayerHealth();
		console.log("Player Health", this.health.remainingHealth);
	}
	loadHuman(ld: ModelLoader, world: Ammo.btDiscreteDynamicsWorld): void {
		if (this.isOtherPlayer) {
			this.playerMesh.add(ld.getScene());
			const transform = new gAmmo.btTransform();
			transform.setIdentity();
			const motionState = new gAmmo.btDefaultMotionState(transform);

			const localInertia = new gAmmo.btVector3(1, 1, 1);
			const rbInfo = new gAmmo.btRigidBodyConstructionInfo(0, motionState, ld.getCollider(), localInertia);
			const body = new gAmmo.btRigidBody(rbInfo);
			body.setFriction(0);
			body.setRestitution(0);
			body.setUserIndex(gCollisionTestBodyIndex++);
			// disable sleep
			body.setSleepingThresholds(0, 0);
			this.hitTestBody = body;
			const collisionFilterMask = 2;
			const collisionFilterGroup = 4;
			world.addRigidBody(this.hitTestBody, collisionFilterGroup, collisionFilterMask);
		}
	}
	delete(scene: THREE.Scene, world: Ammo.btDiscreteDynamicsWorld) {
		world.removeRigidBody(this.rigidbody);
		scene.remove(this.playerMesh);
	}
	applyGraphics() {
		const trans = new gAmmo.btTransform();
		this.rigidbody.getMotionState().getWorldTransform(trans);
		const pos = trans.getOrigin();
		this.playerMesh.position.set(pos.x(), pos.y(), pos.z());
		this.playerMesh.rotation.set(0, this.yaw, 0);
	}
	setFaceImage(stream: MediaStream) {
		const video = document.createElement('video');
		video.autoplay = true;
		video.srcObject = stream;
		const webcam = new THREE.VideoTexture(video);
		const material = new THREE.MeshBasicMaterial({ map: webcam });
		this.playerScreen.material = material;
	}
	getPosition(): THREE.Vector3 {
		const trans = new gAmmo.btTransform();
		this.rigidbody.getMotionState().getWorldTransform(trans);
		const pos = trans.getOrigin();
		return new THREE.Vector3(pos.x(), pos.y(), pos.z());
	}
	getVelocity(): THREE.Vector3 {
		const v = this.rigidbody.getLinearVelocity();
		return new THREE.Vector3(v.x(), v.y(), v.z());
	}
	setVelocity(x: number, y: number, z: number) {
		const v = new gAmmo.btVector3(x, y, z);
		this.rigidbody.setLinearVelocity(v);
	}
	warp(x: number, y: number, z: number) {
		const trans = new gAmmo.btTransform();
		const motionState = this.rigidbody.getMotionState();
		motionState.getWorldTransform(trans);
		trans.setOrigin(new gAmmo.btVector3(x, y, z));
		motionState.setWorldTransform(trans);
		this.rigidbody.setMotionState(motionState);
	}
	setPositionY(y: number) {
		const trans = new gAmmo.btTransform();
		const motionState = this.rigidbody.getMotionState();
		motionState.getWorldTransform(trans);
		const origin = trans.getOrigin();
		origin.setY(y);
		trans.setOrigin(origin);
		motionState.setWorldTransform(trans);
		this.rigidbody.setMotionState(motionState);
	}
	applyHitTestBody(): void {
		if (!this.isOtherPlayer) return;
		const trans = new gAmmo.btTransform();
		{
			const player = new gAmmo.btTransform();
			this.rigidbody.getMotionState().getWorldTransform(player);
			trans.setOrigin(player.getOrigin());
			const quaternion = new gAmmo.btQuaternion(0, 0, 0, 1);
			quaternion.setEulerZYX(0, this.yaw, 0);
			trans.setRotation(quaternion);
		}
		const motionState = this.hitTestBody.getMotionState();
		motionState.setWorldTransform(trans);
		this.hitTestBody.setMotionState(motionState);
	}
	applyGun() {
		if (!this.gun) return;
		const position = this.getPosition();
		this.gun.yaw = this.yaw;
		this.gun.pitch = this.pitch;
		this.gun.point = new gAmmo.btVector3(position.x, position.y + 0.75, position.z);
	}
	walk(sideways: number, forward: number, world: Ammo.btDiscreteDynamicsWorld) {
		const theta = this.yaw;
		let r = Math.sqrt(sideways * sideways + forward * forward);
		r = Math.max(r, 1);
		sideways /= r;
		forward /= r;
		sideways *= 10;
		forward *= 10;
		let vx: number, vz: number;
		if (this.isOtherPlayer) {
			vx = this.vx;
			vz = this.vz;
		} else {
			vx = sideways * Math.cos(-theta) + forward * Math.sin(-theta);
			vz = sideways * Math.sin(-theta) - forward * Math.cos(-theta);
		}
		const p = this.getPosition();
		const start = new gAmmo.btVector3(p.x, p.y, p.z);
		const end = new gAmmo.btVector3(p.x, p.y - 1.5, p.z);
		var result = new gAmmo.ClosestRayResultCallback(start, end); // TODO: reuse callback object
		result.set_m_collisionFilterGroup(2);
		world.rayTest(start, end, result);
		if (result.hasHit()) {

			document.getElementById("log").innerText += " grounded ";
			const normal: Ammo.btVector3 = result.get_m_hitNormalWorld();
			const hitPoint: Ammo.btVector3 = result.get_m_hitPointWorld();
			const distance: number = (() => {
				const dx = start.x() - hitPoint.x();
				const dy = start.y() - hitPoint.y();
				const dz = start.z() - hitPoint.z();
				return Math.sqrt(dx * dx + dy * dy + dz * dz);
			})();
			if (normal.y() !== 0) {
				const vy: number = -(normal.x() * vx + normal.z() * vz) / normal.y();
				const vn2 = (vx * vx + vz * vz);
				const vt2 = (vx * vx + vz * vz + vy * vy);

				//slope correction
				let vx1: number = vx;
				let vz1: number = vz;
				let vy1: number = vy;
				//|velocity| = target * tangent 
				if (vy > 0 && vt2 > 0) {
					vx1 *= vn2 / vt2;
					vz1 *= vn2 / vt2;
					vy1 *= vn2 / vt2;
					document.getElementById("log").innerText += " uphill";
				}
				//|velocity| = |target|
				if (vy < 0) {
					vx1 *= Math.sqrt(vn2 / vt2);
					vy1 *= Math.sqrt(vn2 / vt2);
					vz1 *= Math.sqrt(vn2 / vt2);
					document.getElementById("log").innerText += " downhill";
				}
				const velocity: Ammo.btVector3 = this.rigidbody.getLinearVelocity();
				velocity.setX(vx1);
				velocity.setZ(vz1);
				if (velocity.y() > vy1) {
					velocity.setY(vy1);
				}
				this.rigidbody.setLinearVelocity(velocity);
			}
			// this.rigidbody.position.y = this.rigidbody.position.y - result.distance + 1 + 0.5 / normal.y - 0.5;
			// const correctedVy: number = -slopeY;
			// this.rigidbody.velocity.y = correctedVy;
			/*
			if (this.rigidbody.velocity.y > correctedVy) {
				this.rigidbody.velocity.y = correctedVy;
			}*/
		}
		// this.rigidbody.applyForce(new CANNON.Vec3(vx * Math.cos(theta) - vz * Math.sin(theta), 0, vx * Math.sin(theta) + vz * Math.cos(theta)), this.rigidbody.position);
	}
	triggerGun(): boolean {
		if (this.gun === null) return;
		let lastTriggerState = this.triggered;
		this.triggered = true;
		const time = Date.now();

		if (this.reloadTimer >= 0) {
			// リロード中なので撃てない
			return;
		}

		let allowed: boolean;
		switch (this.gun.rate.type) {
			case 'semi':
				if (lastTriggerState) {
					allowed = false;
				} else {
					allowed = (time - this.lastShotTime) / 1000 >= this.gun.rate.minInterval;
				}
				break;
			case 'auto':
				allowed = (time - this.lastShotTime) / 1000 >= (1.0 / this.gun.rate.rate);
				break;
		}

		if (allowed) {
			if (this.gun.shootNow()) {
				// 撃てた
				this.lastShotTime = time;
				return true;
			} else {
				// 弾切れ or このステップではまだ撃てない
				return false;
			}
		}
	}
	releaseTrigger() {
		this.lastShotTime = 0;
		this.triggered = false;
	}
	requestReload(): boolean {
		if (this.gun === null) {
			return false;
		}
		if (this.reloadTimer < 0) {
			this.reloadTimer = this.gun.reloadTime;
			this.gun.isReloading = true;
			console.log('start reloading');
			return true;
		}
		return false;
	}
	step(dt: number) {
		this.reloadTimer -= dt;
		if (this.gun !== null && this.gun.isReloading && this.reloadTimer < 0) {
			this.gun.completeReload();
			this.gun.isReloading = false;
			console.log('reload completed');
		}
	}

	gotHeal(healAmount: number) {
		const isHealed = this.health.heal(healAmount);
	}

	gotDamage(damageAmount: number) {
		const isAlive = this.health.damage(damageAmount);
		if (!isAlive) {
			console.warn("you are dead :>");
			this.health.heal(100);
			network.sendHPInNextUpdate();
		}
	}
}