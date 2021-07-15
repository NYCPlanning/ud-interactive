const defaultState = {
  posNumber: 0,
};

const posNumberReducer = (state = defaultState, action) => {
  console.log(state.posNumber);
  switch (action.type) {
    case 'NEXT':
      return { ...state, posNumber: state.posNumber + 1 };
    case 'PREVIOUS':
      if (state.posNumber === 0) {
        return state;
      }
      return { ...state, posNumber: state.posNumber - 1 };
    default:
      return state;
  }
};

export default posNumberReducer;
