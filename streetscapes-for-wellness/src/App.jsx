import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import AnimatedScene from './components/AnimatedScene';
import Previous from './components/Previous';
import Next from './components/Next';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const {
    previousPos,
    nextPos,
    saveAnimationTime,
    posNumber,
    animationStarted,
    animationTime,
    inReverse,
  } = props;
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={10} xs={10} md={10} lg={10}>
            <AnimatedScene
              posNumber={posNumber}
              animationStarted={animationStarted}
              animationTime={animationTime}
              saveAnimationTime={saveAnimationTime}
              inReverse={inReverse}
            />
            <Previous previousPos={previousPos} />
            <Next nextPos={nextPos} />
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
};
App.defaultProps = {
  animationTime: 0,
};

export default App;
