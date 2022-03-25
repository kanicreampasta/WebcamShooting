import { gAmmo } from './physics';
import Ammo from './@types/ammo';
import { removeExtmapAllowMixed } from 'video/adapter';
import * as THREE from 'three';
import { gScene } from './renderer';


type GunRate = {
    type: 'semi',
    minInterval: number
} | {
    type: 'auto',
    rate: number
};

export class Gun {
    remainingBulletsInMagazine: number;
    outOfMagazine: number;
    isReloading = false;

    constructor(private magazineSize: number, public rate: GunRate, public reloadTime: number) {
        this.remainingBulletsInMagazine = magazineSize;
    }

    completeReload() {
        if (this.outOfMagazine < this.magazineSize) {
            this.remainingBulletsInMagazine = this.outOfMagazine;
        } else {
            this.remainingBulletsInMagazine = this.magazineSize;
        }
        this.outOfMagazine = Math.max(0, this.outOfMagazine - this.remainingBulletsInMagazine);
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

    private first = true;
    private hitobj: THREE.Object3D;
    test(range: number, world: Ammo.btDiscreteDynamicsWorld) {
        const start = new gAmmo.btVector3(this.point.x(), this.point.y(), this.point.z());
        let end = new gAmmo.btVector3(this.point.x(), this.point.y(), this.point.z());
        let direction = new gAmmo.btVector3(
            -Math.cos(this.pitch) * Math.sin(this.yaw),
            Math.sin(this.pitch),
            -Math.cos(this.pitch) * Math.cos(this.yaw));
        direction.op_mul(range);
        end = end.op_add(direction);
        // console.log(start.x() + "," + start.y() + "," + start.z());
        // console.log(end.x() + "," + end.y() + "," + end.z());
        var result = new gAmmo.ClosestRayResultCallback(start, end); // TODO: reuse callback object
        result.set_m_collisionFilterGroup(2);
        // result.set_m_collisionFilterMask(2);
        world.rayTest(start, end, result);
        if (result.hasHit()) {
            const hitPoint = result.get_m_hitPointWorld();
            console.log("hit " + hitPoint.x() + ',' + hitPoint.y() + ',' + hitPoint.z());
            if (this.first) {
                this.first = false;
                this.hitobj = new THREE.Mesh(
                    new THREE.SphereGeometry(0.1, 8, 8),
                    new THREE.MeshBasicMaterial({ color: 0xff0000 })
                );
                gScene.add(this.hitobj);
            }
            this.hitobj.position.set(hitPoint.x(), hitPoint.y(), hitPoint.z());
        }
        // this.rigidbody.applyForce(new CANNON.Vec3(vx * Math.cos(theta) - vz * Math.sin(theta), 0, vx * Math.sin(theta) + vz * Math.cos(theta)), this.rigidbody.position);
    }
}