export declare function Ammo(): Promise<AmmoInstance>;

export declare class AmmoInstance {
    btDefaultCollisionConfiguration: new () => btDefaultCollisionConfiguration;

    btCollisionDispatcher: new (config: btDefaultCollisionConfiguration) => btCollisionDispatcher;

    btDbvtBroadphase: new () => btDbvtBroadphase;

    btSequentialImpulseConstraintSolver: new () => btSequentialImpulseConstraintSolver;

    btDiscreteDynamicsWorld: new (dispatcher: btCollisionDispatcher, overlappingPairCache: btDbvtBroadphase, solver: btSequentialImpulseConstraintSolver, config: btDefaultCollisionConfiguration) => btDiscreteDynamicsWorld;

    btVector3: new (x: number, y: number, z: number) => btVector3;

    btQuaternion: new () => btQuaternion;

    btTransform: new () => btTransform;

    btBoxShape: new (boxHalfExtents: btVector3) => btBoxShape;

    btDefaultMotionState: new (transform: btTransform) => btDefaultMotionState;

    btRigidBodyConstructionInfo: new (mass: number, motionState: btMotionState, collisionShape: btCollisionShape, localInertia?: btVector3) => btRigidBodyConstructionInfo;

    btRigidBody: new (rbinfo: btRigidBodyConstructionInfo) => btRigidBody;
}

// export declare namespace AmmoInstsance {
//     export class btDefaultCollisionConfiguration {
//         constructor();
//     }
// }

export declare class btDefaultCollisionConfiguration {

}

export declare class btDbvtBroadphase {

}

export declare class btCollisionDispatcher {

}

export declare class btSequentialImpulseConstraintSolver {

}

export declare class btDiscreteDynamicsWorld {
    setGravity(gravity: btVector3): void;
}

export declare class btVector3 {
    constructor();
    constructor(x: number, y: number, z: number);
    length(): number;
    x(): number;
    y(): number;
    z(): number;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    setValue(x: number, y: number, z: number): void;
    normalize(): void;
    dot(v: btVector3): number;
    rotate(wAxis: btVector3, angle: number): btVector3;
}

export declare class btQuaternion {
    constructor(x: number, y: number, z: number, w: number);
    setEulerZYX(z: number, y: number, x: number): void;
}

export declare class btTransform {
    constructor();

    setIdentity(): void;
    setOrigin(origin: btVector3): void;
    setRotation(rotation: btQuaternion): void;
    getOrigin(): btVector3;
    getRotation(): btQuaternion;
}

export declare class btBoxShape implements btCollisionShape {
    calculateLocalInertia(mass: number, inertia: btVector3): void;
}

export declare interface btCollisionShape {
    calculateLocalInertia(mass: number, inertia: btVector3): void;
}

export declare class btDefaultMotionState implements btMotionState {

}

export declare interface btMotionState {

}

export declare class btRigidBodyConstructionInfo {

}

export declare interface btCollisionObject {

}

export declare class btRigidBody implements btCollisionObject {

}
