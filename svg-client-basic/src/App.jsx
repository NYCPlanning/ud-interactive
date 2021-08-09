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

// addMovement: false,
// movementPosition: null,
// movementDur: null,

function App(props) {
  const {
    updateAnimations,
    previousPos,
    nextPos,
    currentPosition,
    posNumber,
    logTime,
    movementBeingAdded,
  } = props;
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
  logTime: PropTypes.func.isRequired,
  updateAnimations: PropTypes.func.isRequired,
  movementBeingAdded: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentPosition: PropTypes.object.isRequired,
};

export default App;
