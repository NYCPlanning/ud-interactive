import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import nextPos from './actions/nextPos';
import saveAnimationTime from './actions/saveAnimationTime';
import posNumberReducer from './reducers/posNumberReducer';

const store = createStore(posNumberReducer);
const mapStateToProps = (state, ownProps) => {
  return {
    posNumber: state.posNumber,
    animationStarted: state.animationStarted,
    animationTime: state.animationTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPos: () => dispatch(nextPos()),
    saveAnimationTime: (time) => dispatch(saveAnimationTime(time)),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

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
