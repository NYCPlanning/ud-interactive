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
    updateAnimations,
    movementBeingAdded,
    posNumber,
    addPosition,
    // gonna get rid of stuff below eventually
    previousPos,
    currentPosition,
    logTime,
  } = props;
  const nextPosition = camPositions[posNumber + 1];
  return (
    <div className="App">
      <AnimatedScene
        movementBeingAdded={movementBeingAdded}
        updateAnimations={updateAnimations}
        posNumber={posNumber}
        logTime={logTime}
        currentPosition={currentPosition}
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
  // getting rid of below
  previousPos: PropTypes.func.isRequired,
  logTime: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentPosition: PropTypes.object.isRequired,
};

export default App;
