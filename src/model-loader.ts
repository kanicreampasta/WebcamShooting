import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { btDiscreteDynamicsWorld } from './@types/ammo';
import { gAmmo } from './physics';
// import * as CANNON from 'cannon';

export class ModelLoader {
	filename: string;
	constructor(filename: string) {
		this.filename = filename;
	}
	//load model from gltf
	async loadModel(): Promise<GLTF> {
		return new Promise<GLTF>(
			(resolve, reject) => {
				const loader = new GLTFLoader();
				// Load a glTF resource
				loader.load(
					// resource URL
					this.filename,
					// called when the resource is loaded
					function (gltf: GLTF) {
						resolve(gltf);
					},
					// called while loading is progressing
					function (xhr) {
						console.log((xhr.loaded / xhr.total * 100) + '% loaded');
					},
					// called when loading has errors
					function (error) {

						console.log('An error happened');

					}
				);
			}
		);
	}
	async loadStage(scene: THREE.Scene, world: btDiscreteDynamicsWorld) {
		const gltf: GLTF = await this.loadModel();
		scene.add(gltf.scene);
		console.log(gltf.scene);
		const compoundShape = new gAmmo.btCompoundShape();
		const collisionFilterMask = 2;
		const collisionFilterGroup = 1;
		for (const mesh of gltf.scene.children) {
			if (mesh instanceof THREE.Mesh) {
				console.log(mesh);
				const geometry: THREE.BufferGeometry = mesh.geometry;
				const rawindex = geometry.index.array;
				const rawverts = geometry.attributes.position.array;
				const rawnormals = geometry.attributes.normal.array;

				// const index: number[] = [];
				// const verts = [];
				// const normals = [];
				// for (let i = 0; i < rawindex.length; i++) {
				// 	index.push(rawindex[i]);
				// }
				// for (let i = 0; i < rawverts.length; i++) {
				// 	verts.push(rawverts[i]);
				// }
				// for (let i = 0; i < rawnormals.length; i++) {
				// 	normals.push(rawnormals[i]);
				// }
				// console.log('verts', verts);
				// console.log('index', index);
				// const shape: CANNON.Trimesh = new CANNON.Trimesh(verts, index);
				// const offset: CANNON.Vec3 = new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z);
				// body.addShape(shape, offset);
				const shape = new gAmmo.btConvexHullShape();
				for (let i = 0; i < rawindex.length; i++) {
					const index = rawindex[i];
					const x = rawverts[index * 3];
					const y = rawverts[index * 3 + 1];
					const z = rawverts[index * 3 + 2];
					const v = new gAmmo.btVector3(x, y, z);
					shape.addPoint(v);
				}

				const trans = new gAmmo.btTransform();
				trans.setIdentity();
				compoundShape.addChildShape(trans, shape);
			}
		}

		const mass = 0;
		const localInertia = new gAmmo.btVector3(0, 0, 0);
		const trans = new gAmmo.btTransform();
		trans.setIdentity();
		const motionState = new gAmmo.btDefaultMotionState(trans);
		const rbinfo = new gAmmo.btRigidBodyConstructionInfo(mass, motionState, compoundShape, localInertia);

		const body = new gAmmo.btRigidBody(rbinfo);

		world.addRigidBody(body, collisionFilterGroup, collisionFilterMask);
	}
}