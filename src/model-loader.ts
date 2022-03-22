import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as CANNON from 'cannon';

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
	async loadStage(scene: THREE.Scene, world: CANNON.World) {
		const gltf: GLTF = await this.loadModel();
		scene.add(gltf.scene);
	}
}