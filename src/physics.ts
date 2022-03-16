import * as THREE from 'three';
import * as CANNON from 'cannon';

export class PhysicsManager {
	world: CANNON.World;
	constructor() {
		this.world = new CANNON.World();
		this.world.gravity.set(0, -9.82, 0);
		this.world.broadphase = new CANNON.NaiveBroadphase();
		(this.world.solver as CANNON.GSSolver).iterations = 10;
		this.world.allowSleep = false;
	}
	addCube(position: CANNON.Vec3, dimention: CANNON.Vec3, rotation: THREE.Euler) {
		const cubeBody: CANNON.Body = new CANNON.Body({ mass: 0 });
		cubeBody.addShape(new CANNON.Box(new CANNON.Vec3(dimention.x, dimention.y, dimention.z)));
		cubeBody.position = position;
		cubeBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
		this.world.addBody(cubeBody);
	}
}