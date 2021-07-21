/* eslint-disable  */

const defaultState = {
  posNumber: 0,
  animationStarted: false,
  animationTime: null,
};

const posNumberReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEXT':
      return { ...state, posNumber: state.posNumber + 1, animationStarted: true };
    case 'PREVIOUS':
      if (state.posNumber === 0) {
        return state;
      }
      return { ...state, posNumber: state.posNumber - 1 };
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

export default posNumberReducer;
