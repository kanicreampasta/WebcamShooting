import * as THREE from 'three';

import { AmmoInstance, btDiscreteDynamicsWorld, btVector3 } from './@types/ammo';

export let gAmmo: AmmoInstance;

declare var Ammo: () => Promise<AmmoInstance>;

export class PhysicsManager {
	world: btDiscreteDynamicsWorld;
	Ammo: AmmoInstance;
	constructor() {
		this.world = null;
		// (this.world.solver as CANNON.GSSolver).iterations = 1;
		// this.world.allowSleep = false;
	}
	init(): Promise<void> {
		return new Promise((resolve) => {
			Ammo().then((Ammo) => {
				console.log(Ammo);
				const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
				const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
				const overlappingPairCache = new Ammo.btDbvtBroadphase();
				const solver = new Ammo.btSequentialImpulseConstraintSolver();
				const dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
				dynamicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));
				this.world = dynamicsWorld;
				this.Ammo = Ammo;
				gAmmo = Ammo;
				resolve();
			});
		});
	}
	addCube(position: btVector3, dimention: btVector3, rotation: THREE.Euler) {
		const shape = new this.Ammo.btBoxShape(dimention);

		const transform = new this.Ammo.btTransform();
		transform.setIdentity();
		transform.setOrigin(position);
		const quat = new this.Ammo.btQuaternion();
		quat.setEulerZYX(rotation.z, rotation.y, rotation.x);
		transform.setRotation(quat);

		const mass = 0;
		const localInertia = new this.Ammo.btVector3(0, 0, 0);
		shape.calculateLocalInertia(mass, localInertia);

		const motionState = new this.Ammo.btDefaultMotionState(transform);
		const rbInfo = new this.Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
		const body = new this.Ammo.btRigidBody(rbInfo);

		this.world.addRigidBody(body);
		// const cubeBody: CANNON.Body = new CANNON.Body({ mass: 0 });
		// cubeBody.addShape(new CANNON.Box(new CANNON.Vec3(dimention.x, dimention.y, dimention.z).mult(0.5)));
		// cubeBody.position = position;
		// cubeBody.collisionFilterMask = 2;
		// cubeBody.collisionFilterGroup = 1;
		// cubeBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
		// this.world.addBody(cubeBody);
	}
}