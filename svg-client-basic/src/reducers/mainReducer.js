import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

function positionsDiff(firstPos, secondPos) {
  const error = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };
  if (
    firstPos > camPositions.length ||
    firstPos < 0 ||
    secondPos > camPositions.length ||
    secondPos < 0
  ) {
    return error;
  }
  const firstPosition = camPositions[firstPos];
  const secondPosition = camPositions[secondPos];
  const x = secondPosition.x - firstPosition.x;
  const y = secondPosition.y - firstPosition.y;
  const z = secondPosition.z - firstPosition.z;
  const lookX = secondPosition.lookAt.x - firstPosition.lookAt.x;
  const lookY = secondPosition.lookAt.y - firstPosition.lookAt.y;
  const lookZ = secondPosition.lookAt.z - firstPosition.lookAt.z;
  return { x, y, z, lookAt: { x: lookX, y: lookY, z: lookZ } };
}

const defaultState = {
  posNumber: 0,
  animationStarted: false,
  animationTime: null,
  inReverse: false,
  elapsedTime: 0,
  animationsInProgress: [],
  currentRates: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
};

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  const { currentRates } = defaultState;
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
          tempAnimationsInProgress.remove(i);
          i -= 1;
        }
      }
      return {
        ...state,
        animationsInProgress: tempAnimationsInProgress,
        currentRates,
      };
    case 'ADDANIM':
      tempAnimationsInProgress.push(action.payload.animation);
      return { ...state, animationsInProgress: tempAnimationsInProgress };
    case 'NEXT':
      tempAnimationsInProgress.push(
        new Animation(
          state.elapsedTime,
          state.elapsedTime + timePerReducer,
          positionsDiff(state.posNumber, state.posNumber + 1)
        )
      );
      return {
        ...state,
        posNumber: state.posNumber + 1,
        animationsInProgress: tempAnimationsInProgress,
      };
    // return { ...state, posNumber: state.posNumber + 1, animationStarted: true, inReverse: false };
    case 'PREVIOUS':
      if (state.posNumber === 0) {
        return state;
      }
      return { ...state, posNumber: state.posNumber - 1, animationStarted: true, inReverse: true };
    case 'SAVEANIMATIONTIME':
      // console.log('animation time: ' + action.payload.time);
      return {
        ...state,
        animationStarted: false,
        animationTime: action.payload.time,
      };
    default:
      return state;
  }
};

export default mainReducer;
