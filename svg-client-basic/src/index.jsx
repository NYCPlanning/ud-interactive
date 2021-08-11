import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import previousPos from './actions/previousPos';
import nextPos from './actions/nextPos';
import mainReducer from './reducers/mainReducer';
import logTimePos from './actions/logTimePos';
import addMovement from './actions/addMovement';
import addPosition from './actions/addPosition';
import updateAnimations from './actions/updateAnimations';
import savePositions from './actions/savePositions';

// addMovement: false,
// movementPosition: null,
// movementDur: null,

const store = createStore(mainReducer);
const mapStateToProps = (state, ownProps) => {
  return {
    posNumber: state.posNumber,
    movementBeingAdded: state.movementBeingAdded,
    currAnimStartTime: state.currAnimStartTime,
    currAnimStartPos: state.currAnimStartPos,
    currAnimEndTime: state.currAnimEndTime,
    currAnimEndPos: state.currAnimEndPos,
    camPositions: state.camPositions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    previousPos: () => dispatch(previousPos()),
    nextPos: () => dispatch(nextPos()),
    logTimePos: (time, position) => dispatch(logTimePos(time, position)),
    updateAnimations: (time, currentPosition) => dispatch(updateAnimations(time, currentPosition)),
    addMovement: (movement, duration) => dispatch(addMovement(movement, duration)),
    addPosition: (position, duration) => dispatch(addPosition(position, duration)),
    savePositions: (cameras) => dispatch(savePositions(cameras)),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
// store.subscribe(() => console.log(JSON.stringify(store.getState())));

function AppWrapper() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
