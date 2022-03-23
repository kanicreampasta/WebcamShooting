import { gAmmo } from './physics';
// import * as CANNON from 'cannon';
import * as THREE from 'three';
import Ammo from './@types/ammo';
import { Gun } from './gun';

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

function GetPlayerMesh(): [THREE.Object3D, THREE.Mesh] {
	const playerMesh: THREE.Object3D = new THREE.Object3D();
	for (let i: number = -1; i <= -1; i++) {
		const sphere: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshLambertMaterial({ color: 0xffffff }));
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
		const sphere: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshLambertMaterial({ color: 0xffffff }));
		sphere.position.set(0, i * 0.5, 0);
		playerMesh.add(sphere);
	}
	const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshNormalMaterial());
	screen.position.set(0, 0.5, -0.5);
	screen.rotation.y = Math.PI;
	playerMesh.add(screen);
	return [playerMesh, screen];
}

export class Player {
	rigidbody: Ammo.btRigidBody;
	playerMesh: THREE.Object3D;
	playerScreen: THREE.Mesh;
	yaw: number = 0;
	pitch: number = 0;
	isOtherPlayer: boolean = false;
	//used for online players
	//global coordinate
	vx: number = 0;
	vz: number = 0;

	gun: Gun

	constructor(scene: THREE.Scene, world: Ammo.btDiscreteDynamicsWorld, isOtherPlayer?: boolean) {
		this.rigidbody = GetPlayerBody();
		if (isOtherPlayer) {
			const mesh = GetOtherPlayerMesh();
			this.playerMesh = mesh[0];
			this.playerScreen = mesh[1];
		} else {
			const mesh = GetOtherPlayerMesh();
			this.playerMesh = mesh[0];
			this.playerScreen = mesh[1];
		}
		scene.add(this.playerMesh);
		const collisionFilterMask = 1;
		const collisionFilterGroup = 2;
		world.addRigidBody(this.rigidbody, collisionFilterGroup, collisionFilterMask);
		this.isOtherPlayer = isOtherPlayer;

		this.gun = new Gun(30);
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
}