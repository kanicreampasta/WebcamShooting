import { gAmmo } from "./physics";
import Ammo from "./@types/ammo";
import { removeExtmapAllowMixed } from "video/adapter";
import * as THREE from "three";
import { gScene } from "./renderer";
import { Player } from "./player";
import { gPlayers } from "./index";

type GunRate =
  | {
      type: "semi";
      minInterval: number;
    }
  | {
      type: "auto";
      rate: number;
    };

export class Gun {
  remainingBulletsInMagazine: number;
  outOfMagazine: number;
  isReloading = false;

  constructor(
    private magazineSize: number,
    public rate: GunRate,
    public reloadTime: number
  ) {
    this.remainingBulletsInMagazine = magazineSize;
    this.outOfMagazine = 0;
    this.yaw = 0;
    this.pitch = 0;
    this.point = new gAmmo.btVector3(0, 0, 0);
  }

  completeReload() {
    if (this.outOfMagazine < this.magazineSize) {
      this.remainingBulletsInMagazine = this.outOfMagazine;
    } else {
      this.remainingBulletsInMagazine = this.magazineSize;
    }
    this.outOfMagazine = Math.max(
      0,
      this.outOfMagazine - this.remainingBulletsInMagazine
    );
  }

  setTotalBullets(n: number) {
    this.outOfMagazine = n;
  }

  shootNow(): boolean {
    if (this.remainingBulletsInMagazine <= 0) {
      return false;
    }
    this.remainingBulletsInMagazine -= 1;
    return true;
  }
  point: Ammo.btVector3;
  yaw: number;
  pitch: number;

  // private first = true;
  // private hitobj: THREE.Object3D;
  test(range: number, world: Ammo.btDiscreteDynamicsWorld): Player | null {
    const start = new gAmmo.btVector3(
      this.point.x(),
      this.point.y(),
      this.point.z()
    );
    let end = new gAmmo.btVector3(
      this.point.x(),
      this.point.y(),
      this.point.z()
    );
    let direction = new gAmmo.btVector3(
      -Math.cos(this.pitch) * Math.sin(this.yaw),
      Math.sin(this.pitch),
      -Math.cos(this.pitch) * Math.cos(this.yaw)
    );
    direction.op_mul(range);
    end = end.op_add(direction);
    // console.log(start.x() + "," + start.y() + "," + start.z());
    // console.log(end.x() + "," + end.y() + "," + end.z());
    var result = new gAmmo.ClosestRayResultCallback(start, end); // TODO: reuse callback object
    result.set_m_collisionFilterGroup(-1);
    result.set_m_collisionFilterMask(5);
    world.rayTest(start, end, result);
    if (result.hasHit()) {
      // const hitPoint = result.get_m_hitPointWorld();
      // if (this.first) {
      //     this.first = false;
      //     this.hitobj = new THREE.Mesh(
      //         new THREE.SphereGeometry(0.1, 8, 8),
      //         new THREE.MeshBasicMaterial({ color: 0xff0000 })
      //     );
      //     gScene.add(this.hitobj);
      // }
      // this.hitobj.position.set(hitPoint.x(), hitPoint.y(), hitPoint.z());

      const collisionObject = result.get_m_collisionObject();
      return this.testPlayer(collisionObject);
    }

    return null;
    // this.rigidbody.applyForce(new CANNON.Vec3(vx * Math.cos(theta) - vz * Math.sin(theta), 0, vx * Math.sin(theta) + vz * Math.cos(theta)), this.rigidbody.position);
  }

  private testPlayer(obj: Ammo.btCollisionObject): Player | null {
    for (const pl of gPlayers) {
      if (pl.hitTestBody?.getUserIndex() === obj.getUserIndex()) {
        return pl;
      }
    }
    return null;
  }
}
