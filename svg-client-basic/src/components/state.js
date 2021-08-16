import { proxy, useSnapshot } from 'valtio';
import Animation from '../classes/Animation';

const fromCamerasCamPositions = [
  {
    x: 266.9136657714844,
    y: 12.793675422668457,
    z: -1009.4786987304688,
    rotate: { x: -0.1182468993259349, y: 0.029789460451504515, z: 2.8959427880809447 },
    fov: 36.24371890583853,
    near: 27.477083206176758,
    far: 55509.2578125,
  },
  {
    x: 881.731201171875,
    y: 1.7312639951705933,
    z: -210.66162109375,
    rotate: { x: -0.03172414383609601, y: 0.0001089973247883296, z: 3.138170319344627 },
    fov: 40.78413978575626,
    near: 0.8360379934310913,
    far: 1688.9661865234375,
  },
  {
    x: 198.42999267578125,
    y: 1.9811999797821045,
    z: -162.68356323242188,
    rotate: { x: 1.09948404380944e-7, y: 5.8667200875106606e-8, z: 1.5395832221358672 },
    fov: 23.164209411993422,
    near: 20.85152816772461,
    far: 42124.296875,
  },
  {
    x: 420.8624267578125,
    y: 1.676400065422058,
    z: -1126.4952392578125,
    rotate: { x: -5.476055786601819e-8, y: -2.3679040950241873e-8, z: 0.5694867477985873 },
    fov: 43.03876917856519,
    near: 7.1851630210876465,
    far: 14515.48046875,
  },
];

export const state = proxy({
  currAnimStartTime: 0,
  currAninStartPos: fromCamerasCamPositions[0],
  currAnimEndTime: 0,
  currAnimEndPos: fromCamerasCamPositions[1],
  animationsInProgress: [
    new Animation(0, 2, fromCamerasCamPositions[0], fromCamerasCamPositions[1]),
  ],
  stepNum: 1,
  currentPos: {},
  elapsedTime: 0,
  nextEndTime: 10,
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
  state.nextEndTime = nextEndTime;
};

export const updateTimePos = (time, pos) => {
  state.elapsedTime = time;
  state.currentPos = pos;
};

export const addPosition = (position, duration) => {
  const snapshot = useSnapshot(state);
  addAnimation(
    new Animation(
      snapshot.elapsedTime,
      snapshot.elapsedTime + duration,
      snapshot.currentPos,
      position
    )
  );
};

export const addMovement = (movement, duration) => {
  const snapshot = useSnapshot(state);
  addAnimation(
    new Animation(snapshot.elapsedTime, snapshot.elapsedTime + duration, newPosition, movement)
  );
};

export const updateAnimations = () => {
  const snapshot = useSnapshot(state);
  let { nextEndTime } = snapshot;
  const tempAnimationsInProgress = [...snapshot.animationsInProgress];
  for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
    if (
      tempAnimationsInProgress[i].getEnd() < nextEndTime &&
      tempAnimationsInProgress[i].getEnd() > state.currentTime
    ) {
      nextEndTime = tempAnimationsInProgress[i].getEnd();
    }
  }
  for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
    if (tempAnimationsInProgress[i].getEnd() < nextEndTime) {
      const removedAnim = tempAnimationsInProgress.splice(i, 0);
      console.log(`animation removed: ${removedAnim}`);
      i -= 1;
    }
  }
  state.nextEndTime = nextEndTime;
  state.animationsInProgress = tempAnimationsInProgress;
};
