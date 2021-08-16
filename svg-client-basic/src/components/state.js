import { proxy, useSnapshot } from 'valtio';

export const state = proxy({
  currAnimStartTime: 0,
  currAninStartPos: {},
  currAnimEndTime: 0,
  currAnimEndPos: {},
  animationsInProgress: [],
  stepNum: 1,
  currentPos: {},
  elapsedTime: 0,
});

const newPosition = { x: 0, y: 0, z: 0, rotate: { x: 0, y: 0, z: 0 } };

export const addAnimation = (newAnimation) => {
  const snapshot = useSnapshot(state);
  const tempAnimationsInProgress = [...snapshot.animationsInProgress];
  let positionToModify = { ...newPosition };
  let nextEndTime = newAnimation.getEnd();
  tempAnimationsInProgress.push(newAnimation);
  for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
    if (tempAnimationsInProgress[i].getEnd() < state.currentTime) {
      const removedAnim = tempAnimationsInProgress.splice(i, 1);
      console.log(`animation removed: ${() => removedAnim.toJSON()}`);
      i -= 1;
    }
  }
  for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
    if (
      tempAnimationsInProgress[i].getEnd() < nextEndTime &&
      tempAnimationsInProgress[i].getEnd() > state.currentTime
    ) {
      nextEndTime = tempAnimationsInProgress[i].getEnd();
    }
  }
  positionToModify = snapshot.currentPos;
  for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
    // console.log(nextEndTime - state.currentTime);
    // console.log(tempAnimationsInProgress[i].getDuration());
    positionToModify = Animation.addPositionChanges(
      positionToModify,
      tempAnimationsInProgress[i].getMovement(),
      nextEndTime - state.currentTime,
      tempAnimationsInProgress[i].getDuration()
    );
  }
  state.currAnimStartTime = snapshot.elapsedTime;
  state.currAnimStartPos = snapshot.currentPos;
  state.currAnimEndTime = nextEndTime;
  state.currAnimEndPos = positionToModify;
  state.animationsInProgress = tempAnimationsInProgress;
};
