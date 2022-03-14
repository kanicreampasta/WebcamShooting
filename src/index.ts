import * as THREE from 'three'
import "./index.css"


const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
const scene: THREE.Scene = new THREE.Scene();

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
camera.position.set(0, 1, 10);
camera.aspect = window.innerWidth / window.innerHeight;

{
	const testMesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
	testMesh.setRotationFromEuler(new THREE.Euler(0, 45, 0));
	testMesh.position.set(0, 0, 0);
	scene.add(testMesh);
}
{
	const testMesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xffffff }));
	testMesh.setRotationFromEuler(new THREE.Euler(0, 45, 0));
	testMesh.position.set(2, 0, 0);
	scene.add(testMesh);
}
{
	const testMesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
	testMesh.setRotationFromEuler(new THREE.Euler(0, 45, 0));
	testMesh.position.set(-2, 0, 0);
	scene.add(testMesh);
}
renderer.setSize(window.innerWidth, window.innerHeight);

const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0,1,1);
const ambient:THREE.AmbientLight=new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambient);
scene.add(directionalLight);

document.body.appendChild(renderer.domElement);

let frametime: number = 0;
let lastFrame: Date = new Date();
function loop() {
	const currentFrame = new Date();
	frametime += (currentFrame.getTime() - lastFrame.getTime()) * 0.001;
	renderer.render(scene, camera);
	lastFrame = currentFrame;

	requestAnimationFrame(loop);
}
loop();
console.log("Hello World!");