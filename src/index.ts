import * as THREE from 'three';
import * as CANNON from "cannon";
import "./index.css";


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
directionalLight.position.set(0, 1, 1);
const ambient: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
scene.add(directionalLight);

document.body.appendChild(renderer.domElement);


const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.NaiveBroadphase();
(world.solver as CANNON.GSSolver).iterations = 10;
world.allowSleep = true;

{
	const cubeBody: CANNON.Body = new CANNON.Body({ mass: 0 });
	cubeBody.addShape(new CANNON.Box(new CANNON.Vec3(10, 0.5, 10)));
	cubeBody.position.x = 0;
	cubeBody.position.y = -5;
	cubeBody.position.z = -5;
	world.addBody(cubeBody);
	const floor: THREE.Mesh =
		new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 10), new THREE.MeshLambertMaterial({ color: 0xffffff }));
	floor.position.set(cubeBody.position.x, cubeBody.position.y, cubeBody.position.z);
	scene.add(floor);
}

const playerBody: CANNON.Body = new CANNON.Body({ mass: 1 });
playerBody.addShape(new CANNON.Sphere(0.5), new CANNON.Vec3(0, 0, 0));
playerBody.addShape(new CANNON.Sphere(0.5), new CANNON.Vec3(0, 1, 0));
playerBody.addShape(new CANNON.Sphere(0.5), new CANNON.Vec3(0, -1, 0));
playerBody.position.y = 2;
playerBody.position.z = -5;
playerBody.quaternion.setFromEuler(0,0,Math.PI/4);
world.addBody(playerBody);

const playerMesh: THREE.Object3D = new THREE.Object3D();
{
	for (let i: number = -1; i <= 1; i++) {
		const sphere: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshLambertMaterial({ color: 0xffffff }));
		sphere.position.set(0,i,0);
		playerMesh.add(sphere);
	}
}
scene.add(playerMesh);




let frametime: number = 0;
let lastFrame: Date = new Date();
function loop() {
	const currentFrame: Date = new Date();
	const dt: number = (currentFrame.getTime() - lastFrame.getTime()) * 0.001;
	playerMesh.position.set(playerBody.position.x, playerBody.position.y, playerBody.position.z);
	playerMesh.quaternion.set(playerBody.quaternion.x, playerBody.quaternion.y, playerBody.quaternion.z, playerBody.quaternion.w);
	renderer.render(scene, camera);
	console.log(playerMesh.position);
	frametime += dt;
	world.step(dt);
	lastFrame = currentFrame;

	requestAnimationFrame(loop);
}
loop();
console.log("Hello World!");