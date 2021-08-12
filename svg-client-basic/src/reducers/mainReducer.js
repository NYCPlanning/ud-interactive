import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

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

const defaultState = {
  camPositions: fromCamerasCamPositions,
  posNumber: 1,
  elapsedTime: 0,
  animationsInProgress: [
    new Animation(0, 2, fromCamerasCamPositions[0], fromCamerasCamPositions[1]),
  ],
  sortedEndTimes: [],
  movementBeingAdded: false,
  movementPosition: null,
  movementDur: null,
  isMovement: null,
  currentTime: 0,
  currAnimStartTime: 0,
  currAnimStartPos: fromCamerasCamPositions[0],
  currAnimEndTime: 2,
  currAnimEndPos: fromCamerasCamPositions[1],
  currentPos: {},
};

const newPosition = { x: 0, y: 0, z: 0, rotate: { x: 0, y: 0, z: 0 } };

function addAnimation(state, newAnimation) {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  let positionToModify = { ...newPosition };
  const endTimesTemp = [...state.sortedEndTimes];
  let nextEndTime = newAnimation.getEnd();
  // console.log(state.currentPos);
  console.log(`new Animation: ${JSON.stringify(newAnimation)}`);
  // console.log(nextEndTime);
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
  // console.log(nextEndTime);
  positionToModify = state.currentPos;
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
  return {
    ...state,
    currAnimStartTime: state.currentTime,
    currAnimStartPos: state.currentPos,
    currAnimEndTime: nextEndTime,
    currAnimEndPos: positionToModify,
    posNumber: state.posNumber + 1,
    animationsInProgress: tempAnimationsInProgress,
  };
}

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  const endTimesTemp = [...state.sortedEndTimes];
  let newState = null;

  switch (action.type) {
    case 'SAVEPOSITIONS':
      console.log(action.payload.camPositions);
      return { ...state, camPositions: action.payload.camPositions };
    case 'LOG':
      return {
        ...state,
        currentTime: action.payload.elapsedTime,
        currentPos: action.payload.position,
      };
    case 'ADDPOSITION':
      newState = addAnimation(
        state,
        new Animation(
          state.currentTime,
          state.currentTime + action.payload.duration,
          state.currentPos,
          action.payload.position
        )
      );
      // console.log(state.currentPos);
      // console.log(JSON.stringify(action.payload));
      // console.log(newPosition);
      return newState;
    case 'ADDMOVEMENT':
      newState = addAnimation(
        state,
        new Animation(
          state.currentTime,
          state.currentTime + action.payload.duration,
          newPosition,
          action.payload.movement
        )
      );
      return newState;
    case 'UPDATE_ANIMATIONS':
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        if (tempAnimationsInProgress[i].getEnd() < endTimesTemp[0]) {
          const removedAnim = tempAnimationsInProgress.splice(i, 0);
          console.log(`animation removed: ${removedAnim}`);
          i -= 1;
        }
      }

      return {
        ...state,
        currAnimStartTime: state.currentTime,
        currAnimStartPos: state.currentPos,
        currAnimEndTime: state.currentTime,
        currAnimEndPos: state.currentPos,
        movementBeingAdded: false,
        movementDur: null,
        movementPosition: null,
        sortedEndTimes: endTimesTemp,
      };
    default:
      return state;
  }
};

export default mainReducer;

// // nextEndTime = state.movementDur + action.payload.time;
// if (state.movementBeingAdded) {
//   newAnimation = new Animation(
//     action.payload.time,
//     action.payload.time + state.movementDur,
//     action.payload.currentPosition,
//     state.movementPosition
//   );
//   // endTimesTemp.push(newAnimation.getEnd());
//   // endTimesTemp.sort();
//   nextEndTime = newAnimation.getEnd();
//   console.log(nextEndTime);
//   tempAnimationsInProgress.push(newAnimation);
//   console.log(action.payload.currentPosition);
//   newPosition = Animation.addPositionChanges(
//     newPosition,
//     newAnimation.getMovement(),
//     nextEndTime - action.payload.time,
//     newAnimation.getDuration()
//   );
//   console.log(newPosition);
//   // console.log(newAnimation);
// }
// // console.log(action.payload.currentPosition);
// // console.log(state.movementPosition);
// // console.log(newAnimation.toJSON());

// for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
//   console.log(newPosition);
//   newPosition = tempAnimationsInProgress[i].addPositionChanges(
//     newPosition,
//     nextEndTime - action.payload.time
//   );
// }
// eslint-disable-next-line no-case-declarations

// if (nextEndTime != null && nextEndTime.length > 0) {
//   nextEndTime = endTimesTemp.shift();
// } else if (tempAnimationsInProgress != null && tempAnimationsInProgress.length > 0) {
//   for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
//     if (tempAnimationsInProgress[i].getEnd() < nextEndTime) {
//       nextEndTime = tempAnimationsInProgress[i].getEnd();
//     }
//   }
// } else {
//   console.log( couldn't find next endtime );
// }
// return { ...state };
