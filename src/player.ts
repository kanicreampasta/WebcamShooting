import { gAmmo } from './physics';
// import * as CANNON from 'cannon';
import * as THREE from 'three';


function GetPlayerBody(): any {
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
	// let mat = new CANNON.Material('capsuleMat');
	// mat.friction = 0;
	// mat.restitution = 0;
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
	rigidbody: any; // Ammo.btRigidBody
	playerMesh: THREE.Object3D;
	playerScreen: THREE.Mesh
	yaw: number = 0;
	pitch: number = 0;
	isOtherPlayer: boolean = false;
	//used for online players
	//global coordinate
	vx: number = 0;
	vz: number = 0;

	constructor(scene: THREE.Scene, world: any /*Ammo.btDiscreteDynamicsWorld*/, isOtherPlayer?: boolean) {
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
		world.addBody(this.rigidbody);
		this.isOtherPlayer = isOtherPlayer;
	}
	delete(scene: THREE.Scene, world: any /*Ammo.btDiscreteDynamicsWorld*/) {
		world.removeRigidBody(this.rigidbody);
		scene.remove(this.playerMesh);
	}
	applyGraphics() {
		const pos: any /*Ammo.btVector3*/ = this.rigidbody.getOrigin();
		this.playerMesh.position.set(pos.x, pos.y, pos.z);
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
		return new THREE.Vector3(this.rigidbody.position.x, this.rigidbody.position.y, this.rigidbody.position.z);
	}
	getVelocity(): THREE.Vector3 {
		return new THREE.Vector3(this.rigidbody.velocity.x, this.rigidbody.velocity.y, this.rigidbody.velocity.z);
	}
	warp(x: number, y: number, z: number) {
		this.rigidbody.position = new CANNON.Vec3(x, y, z);
	}
	walk(vx: number, vz: number, world: CANNON.World) {
		const theta = this.yaw;
		let r = Math.sqrt(vx * vx + vz * vz);
		r = Math.max(r, 1);
		vz /= r;
		vx /= r;
		vx *= 10;
		vz *= 10;
		if (this.isOtherPlayer) {
			this.rigidbody.velocity.x = this.vx;
			this.rigidbody.velocity.z = this.vz;
		} else {
			this.rigidbody.velocity.x = vx * Math.cos(-theta) + vz * Math.sin(-theta);
			this.rigidbody.velocity.z = vx * Math.sin(-theta) - vz * Math.cos(-theta);
		}
		const start = new CANNON.Vec3(this.rigidbody.position.x, this.rigidbody.position.y, this.rigidbody.position.z);
		const end = new CANNON.Vec3(this.rigidbody.position.x, this.rigidbody.position.y - 4, this.rigidbody.position.z);
		var result: CANNON.RaycastResult = new CANNON.RaycastResult();
		const rayCastOptions = {
			collisionFilterMask: 1,
			skipBackfaces: true      /* ignore back faces */
		};
		if (world.raycastClosest(start, end, rayCastOptions, result)) {
			document.getElementById("log").innerText += " grounded ";
			// console.log(result.distance);
			const velocity = new THREE.Vector3(this.rigidbody.velocity.x, this.rigidbody.velocity.y, this.rigidbody.velocity.z);
			const normal = new THREE.Vector3(result.hitNormalWorld.x, result.hitNormalWorld.y, result.hitNormalWorld.z);
			if (result.distance < 1 + Math.sqrt(normal.x * normal.x + normal.z * normal.z) * 3) {
				const slopeY: number = velocity.dot(normal);//positive when going up slope
				const normalcomponent = normal.multiplyScalar(-slopeY);
				const finalvelocity = velocity.add(normalcomponent);
				this.rigidbody.velocity = new CANNON.Vec3(finalvelocity.x, finalvelocity.y, finalvelocity.z);
				document.getElementById("log").innerText += slopeY + "";
			}
			if (result.distance < 1) {
				this.rigidbody.position.y = result.hitPointWorld.y + 1;
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