import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gAmmo } from "./physics";
import Ammo from "./@types/ammo";
// import * as CANNON from 'cannon';

export class ModelLoader {
  filename: string;
  private gltf?: GLTF;
  constructor(filename: string) {
    this.filename = filename;
  }
  getScene(): THREE.Group {
    if (!this.gltf) {
      throw "async loadModel() must be finished before calling getScene().";
    }
    return this.gltf.scene.clone();
  }
  //load model from gltf
  async loadModel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const loader = new GLTFLoader();
      // Load a glTF resource
      loader.load(
        // resource URL
        this.filename,
        // called when the resource is loaded
        (gltf: GLTF) => {
          this.gltf = gltf;
          resolve();
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log("An error happened");
          reject();
        }
      );
    });
  }
  getCollider(): Ammo.btCompoundShape {
    if (!this.gltf) {
      throw "async loadModel() must be finished before calling getCollider().";
    }
    const compoundShape = new gAmmo.btCompoundShape();
    console.log("scene children: " + this.gltf.scene.children.length);
    for (const mesh of this.gltf.scene.children) {
      if (mesh instanceof THREE.Mesh) {
        console.log(mesh);
        const geometry: THREE.BufferGeometry = mesh.geometry;
        const rawindex = geometry.index!.array;
        const rawverts = geometry.attributes.position.array;

        const offset = new gAmmo.btVector3(
          mesh.position.x,
          mesh.position.y,
          mesh.position.z
        );
        const rotation: Ammo.btQuaternion = (() => {
          const q = new gAmmo.btQuaternion(0, 0, 0, 1);
          q.setEulerZYX(mesh.rotation.z, mesh.rotation.y, mesh.rotation.x);
          return q;
        })();
        const scale = (() => {
          const v = mesh.scale;
          return new gAmmo.btVector3(v.x, v.y, v.z);
        })();

        // https://stackoverflow.com/questions/59665854/ammo-js-custom-mesh-collision-with-sphere
        const v = rawverts;
        const trimesh = new gAmmo.btTriangleMesh(true, true);
        for (let i = 0; i * 3 < rawindex.length; i++) {
          const i0 = rawindex[i * 3] * 3;
          const i1 = rawindex[i * 3 + 1] * 3;
          const i2 = rawindex[i * 3 + 2] * 3;
          trimesh.addTriangle(
            new gAmmo.btVector3(v[i0], v[i0 + 1], v[i0 + 2]),
            new gAmmo.btVector3(v[i1], v[i1 + 1], v[i1 + 2]),
            new gAmmo.btVector3(v[i2], v[i2 + 1], v[i2 + 2]),
            false
          );
        }

        const shape = new gAmmo.btBvhTriangleMeshShape(trimesh, false);
        shape.setLocalScaling(scale);
        const trans = new gAmmo.btTransform();
        trans.setIdentity();
        trans.setOrigin(offset);
        trans.setRotation(rotation);
        compoundShape.addChildShape(trans, shape);
      }
    }
    return compoundShape;
  }
  loadStage(scene: THREE.Scene, world: Ammo.btDiscreteDynamicsWorld): void {
    if (!this.gltf) {
      throw "async loadModel() must be finished before calling loadStage().";
    }
    const model = this.getScene();
    scene.add(model);
    console.log(model);
    const compoundShape = this.getCollider();
    const collisionFilterMask = 2;
    const collisionFilterGroup = 1;

    const mass = 0;
    const localInertia = new gAmmo.btVector3(0, 0, 0);
    const trans = new gAmmo.btTransform();
    trans.setIdentity();
    const motionState = new gAmmo.btDefaultMotionState(trans);
    const rbinfo = new gAmmo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      compoundShape,
      localInertia
    );

    const body = new gAmmo.btRigidBody(rbinfo);

    world.addRigidBody(body, collisionFilterGroup, collisionFilterMask);
  }
}
