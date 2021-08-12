import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
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
  // const testObj = { currAnimStartTime, currAnimStartPos, currAnimEndTime, currAnimEndPos };
  // console.log(JSON.stringify(testObj));
  return (
    <div className="App">
      <AnimatedScene />
      <Navigation />
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
App.propTypes = {};

export default App;
