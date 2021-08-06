const defaultState = {
  posNumber: 0,
  animationStarted: false,
  animationTime: null,
  inReverse: false,
  elapsedTime: 0,
};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG':
      // for: animations in progress, iterate + deal with + calculate rates / positions
      return { ...state, elapsedTime: action.payload.elapsedTime };
    case 'NEXT':
      return { ...state, posNumber: state.posNumber + 1, animationStarted: true, inReverse: false };
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
