/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
import Previous from './components/Previous';
import Next from './components/Next';
import Caption from './components/Caption';

// import TestView from './components/TestView';
// import Streetscapes from './components/Streetscapes';
// import StreetscapesCompressed from './components/StreetscapesCompressed';
// import Background from './components/Background';

function App(props) {
  const {
    currentAnimationStartTime,
    currentAnimationEndTime,
    currentAnimationStartPosition,
    currentAnimationEndPosition,
    previousPos,
    nextPos,
    currentPosition,
    saveAnimationTime,
    posNumber,
    animationStarted,
    animationTime,
    inReverse,
    logTime,
    addAnim,
    addMovement,
    newMovement,
    newMovementDur,
    updateAnimations,
  } = props;
  console.log(
    `currentAnimationStartPosition: ${currentAnimationStartPosition} currentAnimationStartTime: ${currentAnimationStartTime} currentAnimationEndTime: ${currentAnimationEndTime} currentAnimationEndPosition ${currentAnimationEndPosition}`
  );
  return (
    <div className="App">
      <AnimatedScene
        addAnim={addAnim}
        addMovement={addMovement}
        newMovement={newMovement}
        newMovementDur={newMovementDur}
        posNumber={posNumber}
        animationStarted={animationStarted}
        updateAnimations={updateAnimations}
        animationTime={animationTime}
        saveAnimationTime={saveAnimationTime}
        inReverse={inReverse}
        logTime={logTime}
        currentPosition={currentPosition}
        currentAnimationStartTime={currentAnimationStartTime}
        currentAnimationStartPosition={currentAnimationStartPosition}
        currentANimationEndTime={currentAnimationEndTime}
        currentAnimationEndPosition={currentAnimationEndPosition}
      />
      <Container>
        <Row>
          <Col sm={10} xs={10} md={10} lg={10} />
        </Row>
        <Row>
          <Col sm={5} xs={5} md={5} lg={5}>
            <Previous previousPos={previousPos} />
            <Next nextPos={nextPos} />
          </Col>
          <Col sm={5} xs={5} md={5} lg={5}>
            <Caption posNumber={posNumber} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
App.propTypes = {
  previousPos: PropTypes.func.isRequired,
  nextPos: PropTypes.func.isRequired,
  posNumber: PropTypes.number.isRequired,
  animationStarted: PropTypes.bool.isRequired,
  animationTime: PropTypes.number,
  logTime: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types

  addAnim: PropTypes.func.isRequired,
  addMovement: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  newMovement: PropTypes.object.isRequired,
  newMovementDur: PropTypes.number.isRequired,
  currentAnimationStartTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentAnimationStartPosition: PropTypes.object.isRequired,
  currentAnimationEndTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentAnimationEndPosition: PropTypes.object.isRequired,
  updateAnimations: PropTypes.func.isRequired,
};
App.defaultProps = {
  animationTime: 0,
};

export default App;
