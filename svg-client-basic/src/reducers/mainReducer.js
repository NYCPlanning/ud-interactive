import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

const defaultState = {
  posNumber: 0,
  elapsedTime: 0,
  animationsInProgress: [],
  movementBeingAdded: false,
  movementPosition: null,
  movementDur: null,
  currAnimStartTime: 0,

  currentRates: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
  // lastPosition: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
  currentPosition: camPositions[0],
  // nextPosition: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
};

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  const currentRates = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };
  const updatedCurrentPosition = { ...state.currentPosition };

  let sinceLastFrame = 0;
  switch (action.type) {
    case 'LOG':
      // for: animations in progress, iterate + deal with + calculate rates / positions
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        const currentAnimation = tempAnimationsInProgress[i];
        if (currentAnimation.getEnd() > state.elapsedTime) {
          const { x, y, z, lookX, lookY, lookZ } = currentAnimation.getRates();
          currentRates.x += x;
          currentRates.y += y;
          currentRates.z += z;
          currentRates.lookAt.x += lookX;
          currentRates.lookAt.y += lookY;
          currentRates.lookAt.z += lookZ;
        } else if (currentAnimation.getEnd() < state.elapsedTime) {
          tempAnimationsInProgress.splice(i, 1);
          i -= 1;
        }
      }
      sinceLastFrame = action.payload.elapsedTime - state.elapsedTime;
      updatedCurrentPosition.x = state.currentPosition.x + sinceLastFrame * currentRates.x;
      updatedCurrentPosition.y = state.currentPosition.y + sinceLastFrame * currentRates.y;
      updatedCurrentPosition.z = state.currentPosition.z + sinceLastFrame * currentRates.z;
      updatedCurrentPosition.lookAt.x =
        state.currentPosition.lookAt.x + sinceLastFrame * currentRates.lookAt.x;
      updatedCurrentPosition.lookAt.y =
        state.currentPosition.lookAt.y + sinceLastFrame * currentRates.lookAt.y;
      updatedCurrentPosition.lookAt.z =
        state.currentPosition.lookAt.z + sinceLastFrame * currentRates.lookAt.z;

      return {
        ...state,
        currentPosition: updatedCurrentPosition,
        elapsedTime: action.payload.elapsedTime,
        animationsInProgress: tempAnimationsInProgress,
        currentRates,
      };
    case 'UPDATE_ANIMATIONS':
      return { ...state, currAnimStartTime: action.payload.time, movementBeingAdded: false };
    case 'ADDMOVEMENT':
      return {
        ...state,
        movementBeingAdded: true,
        movementPosition: action.payload.movement,
        movementDur: action.payload.time,
      };
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
