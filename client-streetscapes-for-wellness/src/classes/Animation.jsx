export default class Animation {
  constructor(startTime, endTime, positionA, positionB) {
    this.startTime = startTime;
    this.endTime = endTime;
    // this.movement = {
    //   x: positionB.x - positionA.x,
    //   y: positionB.y - positionA.y,
    //   z: positionB.z - positionA.z,
    //   lookAt: {
    //     x: positionB.lookAt.x - positionA.lookAt.x,
    //     y: positionB.lookAt.y - positionA.lookAt.y,
    //     z: positionB.lookAt.z - positionA.lookAt.z,
    //   },
    // };
    let x = 0;
    let y = 0;
    let z = 0;
    if (
      'x' in positionA &&
      'x' in positionB &&
      'y' in positionA &&
      'y' in positionB &&
      'z' in positionA &&
      'z' in positionB
    ) {
      x = Animation.dealWithNull(positionA.x, positionB.x);
      y = Animation.dealWithNull(positionA.y, positionB.y);
      z = Animation.dealWithNull(positionA.z, positionB.z);
    }

    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;

    if (
      'rotate' in positionA &&
      'rotate' in positionB &&
      'x' in positionA.rotate &&
      'x' in positionB.rotate &&
      'y' in positionA.rotate &&
      'y' in positionB.rotate &&
      'z' in positionA.rotate &&
      'z' in positionB.rotate
    ) {
      rotateX = Animation.dealWithNull(positionA.rotate.x, positionB.rotate.x);
      rotateY = Animation.dealWithNull(positionA.rotate.y, positionB.rotate.y);
      rotateZ = Animation.dealWithNull(positionA.rotate.z, positionB.rotate.z);
    }

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
      x,
      y,
      z,
      rotate: {
        x: rotateX,
        y: rotateY,
        z: rotateZ,
      },
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

  static addPositionChanges(
    currentPosition,
    positionToAdd,
    currentAnimDuration,
    toAddAnimDuration
  ) {
    const movementFraction = toAddAnimDuration / currentAnimDuration;
    // console.log(movementFraction);
    // return {
    //   x: currentPosition.x + positionToAdd.x * movementFraction,
    //   y: currentPosition.y + positionToAdd.y * movementFraction,
    //   z: currentPosition.z + positionToAdd.z * movementFraction,
    //   lookAt: {
    //     x: currentPosition.lookAt.x + positionToAdd.lookAt.x * movementFraction,
    //     y: currentPosition.lookAt.y + positionToAdd.lookAt.y * movementFraction,
    //     z: currentPosition.lookAt.z + positionToAdd.lookAt.z * movementFraction,
    //   },
    // };
    return {
      x: currentPosition.x + positionToAdd.x * movementFraction,
      y: currentPosition.y + positionToAdd.y * movementFraction,
      z: currentPosition.z + positionToAdd.z * movementFraction,
      rotate: {
        x: currentPosition.rotate.x + positionToAdd.rotate.x * movementFraction,
        y: currentPosition.rotate.y + positionToAdd.rotate.y * movementFraction,
        z: currentPosition.rotate.z + positionToAdd.rotate.z * movementFraction,
      },
      fov: currentPosition.fov + positionToAdd.fov * movementFraction,
      near: currentPosition.near + positionToAdd.near * movementFraction,
      far: currentPosition.far + positionToAdd.far * movementFraction,
    };
  }

  toJSON() {
    return { startTime: this.startTime, endTime: this.endTime, movement: this.movement };
  }
}
