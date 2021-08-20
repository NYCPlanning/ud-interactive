import * as THREE from 'three';

export default class Animation {
  constructor(startTime, endTime, positionA, positionB) {
    this.startTime = startTime;
    this.endTime = endTime;

    let fov = 30;
    let near = 1;
    let far = 500;
    if ('fov' in positionA && 'fov' in positionB) {
      fov = Animation.dealWithNull(positionA.fov, positionB.fov);
    }
    if ('near' in positionA && 'near' in positionB) {
      near = Animation.dealWithNull(positionA.near, positionB.near);
    }
    if ('far' in positionA && 'far' in positionB) {
      far = Animation.dealWithNull(positionA.far, positionB.far);
    }


    this.movement = {
      fov,
      near,
      far,
    };
    // console.log(this.movement);
  }

  static dealWithNull(attributeA, attributeB) {
    if (attributeA != null && attributeB != null) {
      return attributeB - attributeA;
    }
    return 0;
  }

  getDuration() {
    return this.endTime - this.startTime;
  }

  getEnd() {
    return this.endTime;
  }

  getMovement() {
    return this.movement;
  }

  static matrixDiff(matrixA, matrixB, currentAnimDuration) {
    const mw = new Array(16);
    console.log(matrixB);
    console.log(matrixA);
    for(let i = 0; i < 16; i++) {
      mw[i] = matrixB.elements[i] - matrixA.elements[i];
    }
    const matrixWorld = new THREE.Matrix4();
    matrixWorld.set(...mw);
    return matrixWorld;
  }


  static addPositionChanges(
    currentPosition,
    positionToAdd,
    currentAnimDuration,
    toAddAnimDuration
  ) {
    const movementFraction = toAddAnimDuration / currentAnimDuration;
    const matrixWorld = matrixDiff(currentPosition.matrixWorld, positionToAdd.matrixWorld, movementFraction);

    return {
      matrixWorld,
      fov: currentPosition.fov + positionToAdd.fov * movementFraction,
      near: currentPosition.near + positionToAdd.near * movementFraction,
      far: currentPosition.far + positionToAdd.far * movementFraction,
    };
  }

  toJSON() {
    return { startTime: this.startTime, endTime: this.endTime, movement: this.movement };
  }
}
