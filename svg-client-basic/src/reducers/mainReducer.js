import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

const defaultState = {
  posNumber: 0,
  elapsedTime: 0,
  animationsInProgress: [new Animation(0, 2, camPositions[0], camPositions[1])],
  sortedEndTimes: [],
  movementBeingAdded: false,
  movementPosition: null,
  movementDur: null,
  isMovement: null,
  currAnimStartTime: 0,
  currAnimStartPos: camPositions[0],
  currAnimEndTime: 2,
  currAnimEndPos: camPositions[1],

  currentRates: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
  // lastPosition: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
  currentPosition: camPositions[0],
  // nextPosition: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
};

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  let newAnimation = null;

  // eslint-disable-next-line prefer-const
  let newPosition = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };
  const endTimesTemp = [...state.sortedEndTimes];

  switch (action.type) {
    case 'UPDATE_ANIMATIONS':
      if (state.movementBeingAdded) {
        newAnimation = new Animation(
          action.payload.time,
          action.payload.time + state.movementDur,
          action.payload.currentPosition,
          state.movementPosition
        );
        endTimesTemp.push(newAnimation.getEnd());
        endTimesTemp.sort();
      }
      // console.log(action.payload.currentPosition);
      // console.log(state.movementPosition);
      // console.log(newAnimation.toJSON());
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        if (tempAnimationsInProgress[i].getEnd() < endTimesTemp[0]) {
          tempAnimationsInProgress.splice(i, 0);
          i -= 1;
        }
      }
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        newPosition = tempAnimationsInProgress[i].addPositionChanges(
          newPosition,
          endTimesTemp[0] - action.payload.time
        );
      }
      // eslint-disable-next-line no-case-declarations
      let nextEndTime;

      if (nextEndTime != null && nextEndTime.length > 0) {
        nextEndTime = endTimesTemp.shift();
      } else {
        nextEndTime = Number.MAX_SAFE_INTEGER;
      }

      return {
        ...state,
        currAnimStartTime: action.payload.time,
        currAnimStartPos: action.payload.currentPosition,
        currAnimEndTime: nextEndTime,
        currAnimEndPosition: newPosition,
        movementBeingAdded: false,
        movementDur: null,
        movementPosition: null,
        sortedEndTimes: endTimesTemp,
      };
    case 'ADDMOVEMENT':
      return {
        ...state,
        movementBeingAdded: true,
        movementPosition: action.payload.movement,
        movementDur: action.payload.time,
        isMovement: true,
      };
    case 'ADDPOSITION': {
      return {
        ...state,
        movementBeingAdded: true,
        movementPosition: action.payload.position,
        movementDur: action.payload.duration,
        isMovement: false,
      };
    }
    case 'ADDANIM':
      tempAnimationsInProgress.push(action.payload.animation);
      return { ...state, animationsInProgress: tempAnimationsInProgress };
    case 'NEXT':
      tempAnimationsInProgress.push(
        new Animation(
          state.elapsedTime,
          state.elapsedTime + timePerReducer,
          camPositions[state.posNumber],
          camPositions[state.posNumber + 1]
        )
      );
      return {
        ...state,
        posNumber: state.posNumber + 1,
        movementBeingAdded: true,
        animationsInProgress: tempAnimationsInProgress,
      };
    // return { ...state, posNumber: state.posNumber + 1, animationStarted: true, inReverse: false };
    case 'PREVIOUS':
      tempAnimationsInProgress.push(
        new Animation(
          state.elapsedTime,
          state.elapsedTime + timePerReducer,
          camPositions[state.posNumber],
          camPositions[state.posNumber - 1]
        )
      );
      return {
        ...state,
        posNumber: state.posNumber - 1,
        animationsInProgress: tempAnimationsInProgress,
      };
    default:
      return state;
  }
};

export default mainReducer;
