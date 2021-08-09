/* eslint-disable no-case-declarations */
import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

const defaultState = {
  posNumber: 0,
  animationStarted: false,
  addMovement: false,
  newMovement: {},
  newMovementDur: 0,
  animationsInProgress: [
    new Animation(Animation.calcMovement(camPositions[0], camPositions[1]), 0, 2),
  ],
  sortedEndTimes: [],
  currentAnimationStartTime: 0,
  currentAnimationStartPosition: camPositions[0],
  currentAnimationEndTime: 10,
  currentAnimationEndPosition: camPositions[1],
};

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  const endTimesTemp = [...state.sortedEndTimes];
  switch (action.type) {
    case 'ADDMOVEMENT':
      return {
        ...state,
        addMovement: true,
        newMovement: action.payload.movement,
        newMovementDur: action.payload.dur,
      };
    case 'NEXT':
      return {
        ...state,
        addMovement: true,
        newMovement: action.payload.movement,
        newMovementDur: action.payload.dur,
        stepNum: state.stepNum + 1,
      };
    case 'ADDANIM':
      tempAnimationsInProgress.push(action.payload.animation);
      endTimesTemp.push(action.payload.animation.getEnd());
      endTimesTemp.sort();
      return {
        ...state,
        animationStarted: true,
        animationsInProgress: tempAnimationsInProgress,
        sortedEndTimes: endTimesTemp,
      };
    case 'UPDATE_ANIMATIONS':
      let newPosition = { ...state.currentAnimation };
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        // clear out animations that are over
        if (tempAnimationsInProgress[i].getEnd()) {
          tempAnimationsInProgress.splice(i, 0);
          i -= 1;
        }
      }
      const animDuration = state.sortedEndTimes[0] - action.payload.time;
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        newPosition = tempAnimationsInProgress[i].addMovement(newPosition, animDuration);
      }

      const endTime = endTimesTemp.shift();

      return {
        ...state,
        animationsInProgress: tempAnimationsInProgress,
        currentAnimationStartTime: action.payload.time,
        currentAnimationStartPosition: action.paylod.position,
        currentAnimationEndTime: endTime,
        currentAnimationEndPosition: newPosition,
        endTimes: endTimesTemp,
        animationStarted: false,
      };

    // case 'NEXT':
    //   tempAnimationsInProgress.push(
    //     new Animation(
    //       state.elapsedTime,
    //       state.elapsedTime + timePerReducer,
    //       positionsDiff(state.posNumber, state.posNumber + 1)
    //     )
    //   );
    //   return {
    //     ...state,
    //     posNumber: state.posNumber + 1,
    //     animationsInProgress: tempAnimationsInProgress,
    //   };
    // // return { ...state, posNumber: state.posNumber + 1, animationStarted: true, inReverse: false };
    // case 'PREVIOUS':
    //   tempAnimationsInProgress.push(
    //     new Animation(
    //       state.elapsedTime,
    //       state.elapsedTime + timePerReducer,
    //       positionsDiff(state.posNumber, state.posNumber - 1)
    //     )
    //   );
    // return {
    //   ...state,
    //   posNumber: state.posNumber - 1,
    //   animationsInProgress: tempAnimationsInProgress,
    // };
    default:
      return state;
  }
};

export default mainReducer;

// function positionsDiff(firstPos, secondPos) {
//   const error = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };
//   if (
//     firstPos > camPositions.length ||
//     firstPos < 0 ||
//     secondPos > camPositions.length ||
//     secondPos < 0
//   ) {
//     return error;
//   }
//   const firstPosition = camPositions[firstPos];
//   const secondPosition = camPositions[secondPos];
//   const x = secondPosition.x - firstPosition.x;
//   const y = secondPosition.y - firstPosition.y;
//   const z = secondPosition.z - firstPosition.z;
//   const lookX = secondPosition.lookAt.x - firstPosition.lookAt.x;
//   const lookY = secondPosition.lookAt.y - firstPosition.lookAt.y;
//   const lookZ = secondPosition.lookAt.z - firstPosition.lookAt.z;
//   return { x, y, z, lookAt: { x: lookX, y: lookY, z: lookZ } };
// }
