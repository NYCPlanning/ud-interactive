import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

const defaultState = {
  posNumber: 1,
  elapsedTime: 0,
<<<<<<< HEAD
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
=======
  animationsInProgress: [],
  currentRates: { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } },
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
};

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
<<<<<<< HEAD
  let newAnimation = null;

  // eslint-disable-next-line prefer-const
  let newPosition = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };
  const endTimesTemp = [...state.sortedEndTimes];
  let nextEndTime = state.currAnimEndTime;

  switch (action.type) {
    case 'UPDATE_ANIMATIONS':
      // nextEndTime = state.movementDur + action.payload.time;
      if (state.movementBeingAdded) {
        newAnimation = new Animation(
          action.payload.time,
          action.payload.time + state.movementDur,
          action.payload.currentPosition,
          state.movementPosition
        );
        // endTimesTemp.push(newAnimation.getEnd());
        // endTimesTemp.sort();
        nextEndTime = newAnimation.getEnd();
        console.log(nextEndTime);
        tempAnimationsInProgress.push(newAnimation);
        console.log(action.payload.currentPosition);
        newPosition = Animation.addPositionChanges(
          newPosition,
          newAnimation.getMovement(),
          nextEndTime - action.payload.time,
          newAnimation.getDuration()
        );
        console.log(newPosition);
        for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
          if (tempAnimationsInProgress[i].getEnd() < nextEndTime) {
            tempAnimationsInProgress.splice(i, 0);
            i -= 1;
          }
=======
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
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
        }
        return {
          ...state,
          currAnimStartTime: action.payload.time,
          currAnimStartPos: action.payload.currentPosition,
          currAnimEndTime: nextEndTime,
          currAnimEndPos: newPosition,
          movementBeingAdded: false,
          movementDur: null,
          movementPosition: null,
          sortedEndTimes: endTimesTemp,
          animationsInProgress: tempAnimationsInProgress,
        };
        // console.log(newAnimation);
      }
<<<<<<< HEAD
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
      //   console.log("couldn't find next endtime");
      // }
      return { ...state };
    case 'ADDMOVEMENT':
      return {
        ...state,
        movementBeingAdded: true,
        movementPosition: action.payload.movement,
        movementDur: action.payload.time,
        isMovement: true,
      };
    case 'ADDPOSITION': {
      console.log(JSON.stringify(action.payload));
      return {
        ...state,
        movementBeingAdded: true,
        movementPosition: action.payload.position,
        movementDur: action.payload.duration,
=======
      return {
        ...state,
        animationsInProgress: tempAnimationsInProgress,
        currentRates,
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
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
<<<<<<< HEAD
      tempAnimationsInProgress.push(
        new Animation(
          state.elapsedTime,
          state.elapsedTime + timePerReducer,
          camPositions[state.posNumber],
          camPositions[state.posNumber - 1]
        )
      );
=======
      if (state.posNumber === 0) {
        return state;
      }
      return { ...state, posNumber: state.posNumber - 1, animationStarted: true, inReverse: true };
    case 'SAVEANIMATIONTIME':
      // console.log('animation time: ' + action.payload.time);
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
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
