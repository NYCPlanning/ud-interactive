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
      x: positionB.x - positionA.x,
      y: positionB.y - positionA.y,
      z: positionB.z - positionA.z,
      rotate: {
        x: positionB.rotate.x - positionA.rotate.x,
        y: positionB.rotate.y - positionA.rotate.y,
        z: positionB.rotate.z - positionA.rotate.z,
      },
      fov: positionB.fov - positionA.fov,
      near: positionB.near - positionA.near,
      far: positionB.far - positionA.far,
    };
    console.log(this.movement);
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
