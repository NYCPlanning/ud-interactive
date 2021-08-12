import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
import Previous from './components/Previous';
import Next from './components/Next';
import Caption from './components/Caption';
import Navigation from './components/Navigation/index';
// import camPositionsCalc from './functions/camPositionsCalc';

// import TestView from './components/TestView';
// import Streetscapes from './components/Streetscapes';
// import StreetscapesCompressed from './components/StreetscapesCompressed';
// import Background from './components/Background';

// addMovement: false,
// movementPosition: null,
// movementDur: null,

// const camPositions = camPositionsCalc();

function App(props) {
  const {
    updateAnimations,
    movementBeingAdded,
    posNumber,
    addPosition,
    currAnimStartTime,
    currAnimStartPos,
    currAnimEndTime,
    currAnimEndPos,
    addMovement,
    camPositions,
    // gonna get rid of stuff below eventually
    logTimePos,
    previousPos,
    savePositions,
  } = props;
  // const testObj = { currAnimStartTime, currAnimStartPos, currAnimEndTime, currAnimEndPos };
  // console.log(JSON.stringify(testObj));
  const nextPosition = camPositions[posNumber + 1];
  const previousPosition = camPositions[posNumber - 1];
  return (
    <div className="App">
      <AnimatedScene
        savePositions={savePositions}
        movementBeingAdded={movementBeingAdded}
        updateAnimations={updateAnimations}
        currAnimStartTime={currAnimStartTime}
        currAnimStartPos={currAnimStartPos}
        currAnimEndTime={currAnimEndTime}
        currAnimEndPos={currAnimEndPos}
        posNumber={posNumber}
        logTimePos={logTimePos}
      />
      <Navigation addPosition={addPosition} addMovement={addMovement} nextPos={nextPosition} />
      {/* <Container>
        <Row>
          <Col sm={10} xs={10} md={10} lg={10} />
        </Row>

        <Row>
          <Col sm={5} xs={5} md={5} lg={5}>
            <Previous previousPos={previousPosition} addPosition={addPosition} />
            <Next nextPos={nextPosition} addPosition={addPosition} />
          </Col>
          <Col sm={5} xs={5} md={5} lg={5}>
            <Caption posNumber={posNumber} />
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}
App.propTypes = {
  updateAnimations: PropTypes.func.isRequired,
  movementBeingAdded: PropTypes.bool.isRequired,
  addPosition: PropTypes.func.isRequired,
  addMovement: PropTypes.func.isRequired,
  posNumber: PropTypes.number.isRequired,
  currAnimStartTime: PropTypes.number.isRequired,
  logTimePos: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currAnimStartPos: PropTypes.object.isRequired,
  currAnimEndTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currAnimEndPos: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  camPositions: PropTypes.array.isRequired,
  // getting rid of below
  previousPos: PropTypes.func.isRequired,
  savePositions: PropTypes.func.isRequired,
};

export default App;
