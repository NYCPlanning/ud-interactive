import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
import Previous from './components/Previous';
import Next from './components/Next';
import Caption from './components/Caption';
import camPositionsCalc from './functions/camPositionsCalc';

// import TestView from './components/TestView';
// import Streetscapes from './components/Streetscapes';
// import StreetscapesCompressed from './components/StreetscapesCompressed';
// import Background from './components/Background';

// addMovement: false,
// movementPosition: null,
// movementDur: null,

const camPositions = camPositionsCalc();

function App(props) {
  const {
<<<<<<< HEAD
    updateAnimations,
    movementBeingAdded,
=======
    previousPos,
    nextPos,
    saveAnimationTime,
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
    posNumber,
    addPosition,
    currAnimStartTime,
    currAnimStartPos,
    currAnimEndTime,
    currAnimEndPos,
    // gonna get rid of stuff below eventually
    previousPos,
  } = props;
  // const testObj = { currAnimStartTime, currAnimStartPos, currAnimEndTime, currAnimEndPos };
  // console.log(JSON.stringify(testObj));
  const nextPosition = camPositions[posNumber + 1];
  return (
    <div className="App">
      <AnimatedScene
        movementBeingAdded={movementBeingAdded}
        updateAnimations={updateAnimations}
        currAnimStartTime={currAnimStartTime}
        currAnimStartPos={currAnimStartPos}
        currAnimEndTime={currAnimEndTime}
        currAnimEndPos={currAnimEndPos}
        posNumber={posNumber}
<<<<<<< HEAD
=======
        animationStarted={animationStarted}
        animationTime={animationTime}
        saveAnimationTime={saveAnimationTime}
        inReverse={inReverse}
        logTime={logTime}
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
      />
      <Container>
        <Row>
          <Col sm={10} xs={10} md={10} lg={10} />
        </Row>
        <Row>
          <Col sm={5} xs={5} md={5} lg={5}>
            <Previous previousPos={previousPos} />
            <Next nextPos={nextPosition} addPosition={addPosition} />
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
  updateAnimations: PropTypes.func.isRequired,
  movementBeingAdded: PropTypes.bool.isRequired,
  addPosition: PropTypes.func.isRequired,
  posNumber: PropTypes.number.isRequired,
<<<<<<< HEAD
  currAnimStartTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currAnimStartPos: PropTypes.object.isRequired,
  currAnimEndTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currAnimEndPos: PropTypes.object.isRequired,
  // getting rid of below
  previousPos: PropTypes.func.isRequired,
=======
  animationStarted: PropTypes.bool.isRequired,
  animationTime: PropTypes.number,
  saveAnimationTime: PropTypes.func.isRequired,
  inReverse: PropTypes.bool.isRequired,
  logTime: PropTypes.func.isRequired,
};
App.defaultProps = {
  animationTime: 0,
>>>>>>> parent of 725689e (previous / next implemented + positions updating)
};

export default App;
