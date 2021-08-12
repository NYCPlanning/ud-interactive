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
    this.movement = {
      x: Animation.dealWithNull(positionA.x, positionB.x),
      y: Animation.dealWithNull(positionA.y, positionB.y),
      z: Animation.dealWithNull(positionA.z, positionB.z),
      rotate: {
        x: Animation.dealWithNull(positionA.rotate.x, positionB.rotate.x),
        y: Animation.dealWithNull(positionA.rotate.y, positionB.rotate.y),
        z: Animation.dealWithNull(positionA.rotate.z, positionB.rotate.z),
      },
      fov: Animation.dealWithNull(positionA.fov, positionB.fov),
      near: Animation.dealWithNull(positionA.near, positionB.near),
      far: Animation.dealWithNull(positionA.far, positionB.far),
    };
    console.log(this.movement);
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
    console.log(movementFraction);
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
