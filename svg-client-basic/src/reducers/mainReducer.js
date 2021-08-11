import camPositionsCalc from '../functions/camPositionsCalc';
import Animation from '../classes/Animation';

const camPositions = camPositionsCalc();
const timePerReducer = 2;

const defaultState = {
  posNumber: 1,
  elapsedTime: 0,
  animationsInProgress: [new Animation(0, 2, camPositions[0], camPositions[1])],
  sortedEndTimes: [],
  movementBeingAdded: false,
  movementPosition: null,
  movementDur: null,
  isMovement: null,
  currentTime: 0,
  currAnimStartTime: 0,
  currAnimStartPos: camPositions[0],
  currAnimEndTime: 2,
  currAnimEndPos: camPositions[1],
  currentPos: {},
};

const mainReducer = (state = defaultState, action) => {
  const tempAnimationsInProgress = [...state.animationsInProgress];
  let newAnimation = null;

  // eslint-disable-next-line prefer-const
  let newPosition = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };
  const endTimesTemp = [...state.sortedEndTimes];
  let nextEndTime = state.currAnimEndTime;

  switch (action.type) {
    case 'LOG':
      return {
        ...state,
        currentTime: action.payload.elapsedTime,
        currentPos: action.payload.position,
      };
    case 'ADDPOSITION':
      // console.log(state.currentPos);
      // console.log(JSON.stringify(action.payload));
      if (action.payload.isMovement) {
        newAnimation = new Animation(
          state.currentTime,
          state.currentTime + action.payload.duration,
          newPosition,
          action.payload.position
        );
      } else {
        newAnimation = new Animation(
          state.currentTime,
          state.currentTime + action.payload.duration,
          state.currentPos,
          action.payload.position
        );
      }
      console.log(state.currentPos);
      console.log(JSON.stringify(newAnimation));
      nextEndTime = newAnimation.getEnd();
      console.log(nextEndTime);
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
      console.log(nextEndTime);
      newPosition = state.currentPos;

      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        // console.log(nextEndTime - state.currentTime);
        // console.log(tempAnimationsInProgress[i].getDuration());
        newPosition = Animation.addPositionChanges(
          newPosition,
          tempAnimationsInProgress[i].getMovement(),
          nextEndTime - state.currentTime,
          tempAnimationsInProgress[i].getDuration()
        );
      }
      // console.log(newPosition);
      return {
        ...state,
        currAnimStartTime: state.currentTime,
        currAnimStartPos: state.currentPos,
        currAnimEndTime: nextEndTime,
        currAnimEndPos: newPosition,
        posNumber: state.posNumber + 1,
        animationsInProgress: tempAnimationsInProgress,
      };
    case 'UPDATE_ANIMATIONS':
      for (let i = 0; i < tempAnimationsInProgress.length; i += 1) {
        if (tempAnimationsInProgress[i].getEnd() < endTimesTemp[0]) {
          const removedAnim = tempAnimationsInProgress.splice(i, 0);
          console.log(`animation removed: ${removedAnim}`);
          i -= 1;
        }
      }
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
    //   console.log("couldn't find next endtime");
    // }
    // return { ...state };
    default:
      return state;
  }
};

export default mainReducer;
