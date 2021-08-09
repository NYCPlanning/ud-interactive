class Animation {
  constructor(startTime, endTime, movement) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.movement = movement;
  }

  getDuration() {
    return this.endTime - this.startTime;
  }

  getEnd() {
    return this.endTime;
  }

  getRate() {
    const duration = this.getDuration();
    const x = this.movement.x / duration;
    const y = this.movement.y / duration;
    const z = this.movement.z / duration;
    const lookX = this.movement.lookAt.x / duration;
    const lookY = this.movement.lookAt.y / duration;
    const lookZ = this.movement.lookAt.z / duration;
    return { x, y, z, lookX, lookY, lookZ };
  }
}
