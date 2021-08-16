import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimatedScene from './components/AnimatedScene';
import Caption from './components/Caption';
import Navigation from './components/Navigation/index';
import Animation from './classes/Animation';
// import camPositionsCalc from './functions/camPositionsCalc';

// import TestView from './components/TestView';
// import Streetscapes from './components/Streetscapes';
// import StreetscapesCompressed from './components/StreetscapesCompressed';
// import Background from './components/Background';

// addMovement: false,
// movementPosition: null,
// movementDur: null,

// const camPositions = camPositionsCalc();

const fromCamerasCamPositions = [
  {
    x: 266.9136657714844,
    y: 12.793675422668457,
    z: -1009.4786987304688,
    rotate: { x: -0.1182468993259349, y: 0.029789460451504515, z: 2.8959427880809447 },
    fov: 36.24371890583853,
    near: 27.477083206176758,
    far: 55509.2578125,
  },
  {
    x: 881.731201171875,
    y: 1.7312639951705933,
    z: -210.66162109375,
    rotate: { x: -0.03172414383609601, y: 0.0001089973247883296, z: 3.138170319344627 },
    fov: 40.78413978575626,
    near: 0.8360379934310913,
    far: 1688.9661865234375,
  },
  {
    x: 198.42999267578125,
    y: 1.9811999797821045,
    z: -162.68356323242188,
    rotate: { x: 1.09948404380944e-7, y: 5.8667200875106606e-8, z: 1.5395832221358672 },
    fov: 23.164209411993422,
    near: 20.85152816772461,
    far: 42124.296875,
  },
  {
    x: 420.8624267578125,
    y: 1.676400065422058,
    z: -1126.4952392578125,
    rotate: { x: -5.476055786601819e-8, y: -2.3679040950241873e-8, z: 0.5694867477985873 },
    fov: 43.03876917856519,
    near: 7.1851630210876465,
    far: 14515.48046875,
  },
];

const newPosition = { x: 0, y: 0, z: 0, lookAt: { x: 0, y: 0, z: 0 } };

function App(props) {
  const [untimedAnimation, setUntimedAnimation] = useState({});
  const [animationStack, setAnimationStack] = useState([]);
  const [currAnimStartTime, setCurrAnimStartTime] = useState(0);
  const [currAnimStartPos, setCurrAnimStartPos] = useState(fromCamerasCamPositions[0]);
  const [currAnimEndTime, setCurrAnimEndTime] = useState(5);
  const [currAnimEndPos, setCurrAnimEndPos] = useState(fromCamerasCamPositions[1]);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentPos, setCurrentPos] = useState(fromCamerasCamPositions[0]);
  const [stepNum, setStepNum] = useState(1);

  const testObj = { currAnimStartTime, currAnimEndTime, currAnimStartPos, currAnimEndPos };
  console.log(JSON.stringify(testObj));
  useEffect(() => {
    // const tempAnimationStack = [...animationStack];
    // if (untimedAnimation != null) {
    //   if (untimedAnimation.isPosition) {
    //     tempAnimationStack.push(
    //       new Animation(
    //         currentTime,
    //         currentTime + untimedAnimation.duration,
    //         currentPos,
    //         untimedAnimation.position
    //       )
    //     );
    //   } else {
    //     tempAnimationStack.push(
    //       new Animation(
    //         currentTime,
    //         currentTime + untimedAnimation.duration,
    //         newPosition,
    //         untimedAnimation.movement
    //       )
    //     );
    //   }
    //   setAnimationStack(tempAnimationStack);
    //   setUntimedAnimation(null);
    // }
    // console.log(`untimed animation: ${JSON.stringify(untimedAnimation)}`);
    // console.log(`animation stack: ${JSON.stringify(animationStack)}`);
    console.log(`current time: ${JSON.stringify(currentTime)}`);
    console.log(`current position: ${JSON.stringify(currentPos)}`);
  });
  // const testObj = { currAnimStartTime, currAnimStartPos, currAnimEndTime, currAnimEndPos };
  // console.log(JSON.stringify(testObj));
  return (
    <div className="App">
      <AnimatedScene
        untimedAnimation={untimedAnimation}
        setUntimedAnimation={setUntimedAnimation}
        animationStack={animationStack}
        setAnimationStack={setAnimationStack}
        setCurrentTime={setCurrentTime}
        setCurrentPos={setCurrentPos}
        currAnimStartTime={currAnimStartTime}
        currAnimStartPos={currAnimStartPos}
        currAnimEndTime={currAnimEndTime}
        currAnimEndPos={currAnimEndPos}
      />
      <Navigation
        setUntimedAnimation={setUntimedAnimation}
        stepNum={stepNum}
        setStepNum={setStepNum}
        fromCamerasCamPositions={fromCamerasCamPositions}
      />
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
