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
    previousPos,
    nextPos,
    saveAnimationTime,
    posNumber,
    animationStarted,
    animationTime,
    inReverse,
    logTime,
  } = props;
  return (
    <div className="App">
      <AnimatedScene
        posNumber={posNumber}
        animationStarted={animationStarted}
        animationTime={animationTime}
        saveAnimationTime={saveAnimationTime}
        inReverse={inReverse}
        logTime={logTime}
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
  saveAnimationTime: PropTypes.func.isRequired,
  inReverse: PropTypes.bool.isRequired,
  logTime: PropTypes.func.isRequired,
};
App.defaultProps = {
  animationTime: 0,
};

export default App;
