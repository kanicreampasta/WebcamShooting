import * as CANNON from 'cannon';
import * as THREE from 'three';


function GetPlayerBody(): CANNON.Body {
	const playerBody: CANNON.Body = new CANNON.Body({ mass: 1 });
	playerBody.addShape(new CANNON.Sphere(0.5), new CANNON.Vec3(0, 0, 0));
	playerBody.addShape(new CANNON.Sphere(0.5), new CANNON.Vec3(0, 0.5, 0));
	playerBody.addShape(new CANNON.Sphere(0.5), new CANNON.Vec3(0, -0.5, 0));
	let mat = new CANNON.Material('capsuleMat');
	mat.friction = 0;
	mat.restitution = 0;
	playerBody.material = mat;
	playerBody.fixedRotation = true;
	playerBody.collisionFilterMask = 1;
	playerBody.collisionFilterGroup = 2;
	playerBody.updateMassProperties();

	return playerBody;
}

function GetPlayerMesh(): THREE.Object3D {
	const playerMesh: THREE.Object3D = new THREE.Object3D();
	for (let i: number = -1; i <= -1; i++) {
		const sphere: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshLambertMaterial({ color: 0xffffff }));
		sphere.position.set(0, i * 0.5, 0);
		playerMesh.add(sphere);
	}
	return playerMesh;
}

export class Player {
	rigidbody: CANNON.Body;
	playerMesh: THREE.Object3D;
	yaw: number = 0;
	pitch: number = 0;
	constructor(scene: THREE.Scene, world: CANNON.World) {
		this.rigidbody = GetPlayerBody();
		this.playerMesh = GetPlayerMesh();
		scene.add(this.playerMesh);
		world.addBody(this.rigidbody);
	}
	applyGraphics() {
		const pos: CANNON.Vec3 = this.rigidbody.position;
		this.playerMesh.position.set(pos.x, pos.y, pos.z);
		this.playerMesh.rotation.set(0, this.yaw, 0);
	}
	setFaceImage() {
		throw "Not Implemented yet";
	}
	getPosition(): THREE.Vector3 {
		return new THREE.Vector3(this.rigidbody.position.x, this.rigidbody.position.y, this.rigidbody.position.z);
	}
	getVelocity(): THREE.Vector3 {
		return new THREE.Vector3(this.rigidbody.velocity.x, this.rigidbody.velocity.y, this.rigidbody.velocity.z);
	}
	walk(vx: number, vz: number, world: CANNON.World) {
		const theta = this.yaw;
		let r = Math.sqrt(vx * vx + vz * vz);
		r = Math.max(r, 1);
		vz /= r;
		vx /= r;
		vx *= 10;
		vz *= 10;
		this.rigidbody.velocity.x = vx * Math.cos(-theta) + vz * Math.sin(-theta);
		this.rigidbody.velocity.z = vx * Math.sin(-theta) - vz * Math.cos(-theta);
		const start = new CANNON.Vec3(this.rigidbody.position.x, this.rigidbody.position.y, this.rigidbody.position.z);
		const end = new CANNON.Vec3(this.rigidbody.position.x, this.rigidbody.position.y - 1.5, this.rigidbody.position.z);
		var result: CANNON.RaycastResult = new CANNON.RaycastResult();
		const rayCastOptions = {
			collisionFilterMask: 1,
			skipBackfaces: true      /* ignore back faces */
		};
		if (world.raycastClosest(start, end, rayCastOptions, result)) {
			document.getElementById("log").innerText += " grounded ";
			console.log(result.distance);
			const velocity = new THREE.Vector3(this.rigidbody.velocity.x, this.rigidbody.velocity.y, this.rigidbody.velocity.z);
			const normal = new THREE.Vector3(result.hitNormalWorld.x, result.hitNormalWorld.y, result.hitNormalWorld.z);
			const slopeY: number = velocity.dot(normal);//positive when going up slope
			const normalcomponent = normal.multiplyScalar(-slopeY);
			const finalvelocity = velocity.add(normalcomponent);
			this.rigidbody.velocity = new CANNON.Vec3(finalvelocity.x, finalvelocity.y, finalvelocity.z);
			document.getElementById("log").innerText += slopeY + "";
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