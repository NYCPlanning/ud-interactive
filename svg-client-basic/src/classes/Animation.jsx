export default class Animation {
  constructor(startTime, endTime, positionA, positionB) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.movement = {
      x: positionB.x - positionA.x,
      y: positionB.y - positionA.y,
      z: positionB.z - positionA.z,
      lookAt: {
        x: positionB.lookAt.x - positionA.lookAt.x,
        y: positionB.lookAt.y - positionA.lookAt.y,
        z: positionB.lookAt.z - positionA.lookAt.z,
      },
    };
    console.log(this.movement);
  }

  getDuration() {
    return this.endTime - this.startTime;
  }

  getEnd() {
    return this.endTime;
  }

  getRates() {
    const duration = this.getDuration();
    const x = this.movement.x / duration;
    const y = this.movement.y / duration;
    const z = this.movement.z / duration;
    const lookX = this.movement.lookAt.x / duration;
    const lookY = this.movement.lookAt.y / duration;
    const lookZ = this.movement.lookAt.z / duration;
    return { x, y, z, lookX, lookY, lookZ };
  }

  addPositionChanges(otherMovement, duration) {
    const movementFraction = duration / this.getDuration();
    return {
      x: otherMovement.x + this.movement.x * movementFraction,
      y: otherMovement.y + this.movement.y * movementFraction,
      z: otherMovement.z + this.movement.z * movementFraction,
      lookAt: {
        x: otherMovement.lookAt.x + this.movement.lookAt.x * movementFraction,
        y: otherMovement.lookAt.y + this.movement.lookAt.y * movementFraction,
        z: otherMovement.lookAt.z + this.movement.lookAt.z * movementFraction,
      },
    };
  }

  toJSON() {
    return { startTime: this.startTime, endTime: this.endTime, movement: this.movement };
  }
}
