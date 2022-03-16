import * as THREE from 'three';
import * as PLAYER from "./player";
export class RenderingManager {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	constructor() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera();
		this.camera.position.set(0, 1, 10);
		this.camera.aspect = window.innerWidth / window.innerHeight;


		const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(0, 1, 1);
		const ambient: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambient);
		this.scene.add(directionalLight);
		document.body.appendChild(this.renderer.domElement);

		// Pointer Lock API
		const canvas = this.renderer.domElement;
		canvas.requestPointerLock = canvas.requestPointerLock || (canvas as any).mozRequestPointerLock;
		canvas.addEventListener('click', () => {
			canvas.requestPointerLock();
		});
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	setFPSCamera(player: PLAYER.Player) {
		const p = new THREE.Quaternion().setFromEuler(new THREE.Euler(player.pitch, 0, 0));
		const y = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, player.yaw, 0));
		const m = new THREE.Quaternion().multiplyQuaternions(y, p);
		this.camera.setRotationFromQuaternion(m);
		const position = player.getPosition();
		position.y += 0.5;
		this.camera.position.set(position.x, position.y, position.z);
	}
	setKillCamera(target: THREE.Vector3) {
		throw "not implemented";
	}
	addCube(position: THREE.Vector3, dimention: THREE.Vector3, rotation: THREE.Euler, color?: THREE.ColorRepresentation) {
		color = color || new THREE.Color("#fff");
		const mesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(dimention.x, dimention.y, dimention.z),
			new THREE.MeshLambertMaterial({ color: color }));
		mesh.setRotationFromEuler(rotation);
		mesh.position.set(position.x, position.y, position.z);
		this.scene.add(mesh);
	}
	getCanvas(): HTMLCanvasElement {
		return this.renderer.domElement;
	}
}