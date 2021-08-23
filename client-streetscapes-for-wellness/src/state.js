import { proxy } from 'valtio';
// import Animation from './classes/Animation';

export const state = proxy({
  index: 0,
  cameras: [],
  animations: [],
  annotations: [],
  scene: null,
  sunPosition: [50, 100, 50],
  dematerialize: false,
  showAnnotations: true,
  // currAnimStartTime: 0,
  // currAnimStartPos: fromCamerasCamPositions[0],
  // currAnimEndTime: 0,
  // currAnimEndPos: fromCamerasCamPositions[1],
  // animationsInProgress: [
  //   new Animation(0, 2, fromCamerasCamPositions[0], fromCamerasCamPositions[1]),
  // ],
  // currentPos: {},
  // elapsedTime: 0,
  // nextEndTime: 10,
});

export const nextPos = () => {
  increment(1)
};

export const previousPos = () => {
  increment(-1)
};

const increment = (n) => {
  if ( state.index + n > state.cameras.length - 1 ) state.index = 0
  else if ( state.index + n < 0 ) state.index = state.cameras.length - 1
  else state.index += n
};

// const newPosition = { x: 0, y: 0, z: 0, rotate: { x: 0, y: 0, z: 0 } };

// export const addCameraAnimation = (newAnimation) => {
//   const tempAnimationsInProgress = [...state.animationsInProgress];
//   let positionToModify = { ...newPosition };
//   let nextEndTime = newAnimation.getEnd();
//   tempAnimationsInProgress.push(newAnimation);

//   for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
//     if (tempAnimationsInProgress[i].getEnd() < state.elapsedTime) {
//       // eslint-disable-next-line no-unused-vars
//       const removedAnim = tempAnimationsInProgress.splice(i, 1);
//       // console.log(`animation removed: ${() => removedAnim.toJSON()}`);
//       i -= 1;
//     }
//   }

//   for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
//     if (
//       tempAnimationsInProgress[i].getEnd() < nextEndTime &&
//       tempAnimationsInProgress[i].getEnd() > state.elapsedTime
//     ) {
//       nextEndTime = tempAnimationsInProgress[i].getEnd();
//     }
//   }
  
//   positionToModify = state.currentPos;

//   for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
//     // console.log(nextEndTime - state.currentTime);
//     // console.log(tempAnimationsInProgress[i].getDuration());
//     positionToModify = Animation.addPositionChanges(
//       positionToModify,
//       tempAnimationsInProgress[i].getMovement(),
//       nextEndTime - state.elapsedTime,
//       tempAnimationsInProgress[i].getDuration()
//     );
//   }

//   state.currAnimStartTime = state.elapsedTime;
//   state.currAnimStartPos = state.currentPos;
//   state.currAnimEndTime = nextEndTime;
//   state.currAnimEndPos = positionToModify;
//   state.animationsInProgress = tempAnimationsInProgress;
//   state.nextEndTime = nextEndTime;
// };

// export const updateTimePos = (time, pos) => {
//   state.elapsedTime = time;
//   state.currentPos = pos;
// };

// export const addPosition = (position, duration) => {
//   addAnimation(
//     new Animation(state.elapsedTime, state.elapsedTime + duration, state.currentPos, position)
//   );
// };

// export const addMovement = (movement, duration) => {
//   addAnimation(
//     new Animation(state.elapsedTime, state.elapsedTime + duration, newPosition, movement)
//   );
// };

// export const updateAnimations = (time, position) => {
//   let { nextEndTime } = state;
//   const tempAnimationsInProgress = [...state.animationsInProgress];
//   for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
//     if (
//       tempAnimationsInProgress[i].getEnd() < nextEndTime &&
//       tempAnimationsInProgress[i].getEnd() > time
//     ) {
//       nextEndTime = tempAnimationsInProgress[i].getEnd();
//     }
//   }
//   for (
//     let i = 0;
//     i < tempAnimationsInProgress.length || tempAnimationsInProgress.length === 0;
//     i += 1
//   ) {
//     if (
//       tempAnimationsInProgress.length !== 0 &&
//       tempAnimationsInProgress[i].getEnd() < nextEndTime
//     ) {
//       // eslint-disable-next-line no-unused-vars
//       const removedAnim = tempAnimationsInProgress.splice(i, 1);
//       // console.log(`animation removed: ${removedAnim}`);
//       i -= 1;
//     }
//   }
//   // calc start/end pos for next animation
//   state.currentPos = position;
//   state.nextEndTime = nextEndTime;
//   state.animationsInProgress = tempAnimationsInProgress;
// };
