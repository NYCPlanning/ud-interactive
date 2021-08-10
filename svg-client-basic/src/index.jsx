import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import previousPos from './actions/previousPos';
import nextPos from './actions/nextPos';
import saveAnimationTime from './actions/saveAnimationTime';
import mainReducer from './reducers/mainReducer';
import logTime from './actions/logTime';
import addMovement from './actions/addMovement';
import addPosition from './actions/addPosition';
import updateAnimations from './actions/updateAnimations';

// addMovement: false,
// movementPosition: null,
// movementDur: null,

const store = createStore(mainReducer);
const mapStateToProps = (state, ownProps) => {
  return {
    posNumber: state.posNumber,
<<<<<<< HEAD
    movementBeingAdded: state.movementBeingAdded,
    currAnimStartTime: state.currAnimStartTime,
    currAnimStartPos: state.currAnimStartPos,
    currAnimEndTime: state.currAnimEndTime,
    currAnimEndPos: state.currAnimEndPos,
=======
    animationStarted: state.animationStarted,
    animationTime: state.animationTime,
    inReverse: state.inReverse,
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    previousPos: () => dispatch(previousPos()),
    nextPos: () => dispatch(nextPos()),
<<<<<<< HEAD
    updateAnimations: (time, currentPosition) => dispatch(updateAnimations(time, currentPosition)),
    addMovement: (movement, duration) => dispatch(addMovement(movement, duration)),
    addPosition: (position, duration) => dispatch(addPosition(position, duration)),
=======
    saveAnimationTime: (time) => dispatch(saveAnimationTime(time)),
    logTime: (elapsedTime) => dispatch(logTime(elapsedTime)),
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
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
