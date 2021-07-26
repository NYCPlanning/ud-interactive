import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';
import lightingtest from '../assets/lightingtest.json';

const showSample = true;

// not able to get showSample functionality up and working yet
function getCamPositions() {
  if (showSample) {
    return [
      {
        x: 100,
        y: 50,
        z: 0,
        timePer: 2,
        lookAt: {
          x: 50,
          y: 5,
          z: 0,
        },
      },
      {
        x: 400,
        y: 200,
        z: 100,
        timePer: 0.5,
        lookAt: {
          x: 50,
          y: 5,
          z: 0,
        },
      },
      {
        x: 200,
        y: 0,
        z: 50,
        timePer: 4,
        lookAt: {
          x: 50,
          y: 5,
          z: 0,
        },
      },
      {
        x: -200,
        y: -100,
        z: 50,
        timePer: 1,
        lookAt: {
          x: 50,
          y: 5,
          z: 0,
        },
      },
      {
        x: -300,
        y: 200,
        z: 200,
        timePer: 10,
        lookAt: {
          x: 50,
          y: 5,
          z: 0,
        },
      },
    ];
  }
  return [
    {
      x: 40,
      y: 0,
      z: -40,
      timePer: 10,
      lookAt: {
        x: 50,
        y: 5,
        z: 0,
      },
    },
    {
      x: 600,
      y: 0,
      z: -200,
      timePer: 0.5,
      lookAt: {
        x: 50,
        y: 5,
        z: 0,
      },
    },
    {
      x: 800,
      y: 100,
      z: -300,
      timePer: 2,
      lookAt: {
        x: 50,
        y: 5,
        z: 0,
      },
    },
    {
      x: 100,
      y: -100,
      z: -400,
      timePer: 4,
      lookAt: {
        x: 50,
        y: 5,
        z: 0,
      },
    },
  ];
}

function getModelToUse() {
  if (showSample) {
    return sample;
  }
  return lightingtest;
}

const camPositions = getCamPositions();

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(getModelToUse());

  // make materials double-sided
  scene.traverse((o) => {
    // eslint-disable-next-line no-param-reassign
    if (o.material) o.material.side = THREE.DoubleSide;
  });
  return <primitive object={scene} dispose={null} />;
};

const timePer = 2;

function positionCalc(oldPositions, newPositions, currentAnimProgress) {
  const x = THREE.MathUtils.lerp(oldPositions.x, newPositions.x, currentAnimProgress);
  const y = THREE.MathUtils.lerp(oldPositions.y, newPositions.y, currentAnimProgress);
  const z = THREE.MathUtils.lerp(oldPositions.z, newPositions.z, currentAnimProgress);
  return new THREE.Vector3(x, y, z);
  // return { x, y, z };
}

function getTimePer(inReverse, posNumber) {
  if (posNumber < camPositions.length && posNumber >= 0) {
    if (!inReverse) {
      return camPositions[posNumber].timePer;
    }
    if (posNumber > 0) {
      return camPositions[posNumber - 1].timePer;
    }
  }
  console.log('uh oh, timePer not working');
  return timePer;
}

function getPositions(inReverse, posNumber, length) {
  let oldPos = 0;
  let newPos = 0;
  if ((inReverse && posNumber === length - 1) || (!inReverse && posNumber === 0)) {
    oldPos = posNumber;
    newPos = posNumber;
  } else if (posNumber < 0) {
    oldPos = 0;
    newPos = 0;
  } else if (posNumber >= length) {
    oldPos = camPositions.length - 1;
    newPos = camPositions.length - 1;
  } else if (inReverse) {
    oldPos = posNumber + 1;
    newPos = posNumber;
  } else {
    oldPos = posNumber - 1;
    newPos = posNumber;
  }
  return { oldPos, newPos };
}

function Dolly(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime, inReverse } = props;

  useFrame(({ clock, camera }) => {
    let currentAnimProgress =
      (clock.getElapsedTime() - animationTime) / getTimePer(inReverse, posNumber);
    if (animationStarted) {
      // console.log('animation started in Dolly');
      saveAnimationTime(clock.getElapsedTime());
      currentAnimProgress = 0;
    }
    if (currentAnimProgress > 1) {
      currentAnimProgress = 1;
    }

    const { oldPos, newPos } = getPositions(inReverse, posNumber, camPositions.length);
    const oldPositions = camPositions[oldPos];
    const newPositions = camPositions[newPos];

    const oldLookAt = camPositions[oldPos].lookAt;
    const newLookAt = camPositions[newPos].lookAt;

    const currentPosition = positionCalc(oldPositions, newPositions, currentAnimProgress);
    const currentLookAt = positionCalc(oldLookAt, newLookAt, currentAnimProgress);

    camera.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    camera.lookAt(currentLookAt);
  });
  return null;
}

export default function AnimatedScene(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime, inReverse } = props;
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height: 400, width: 800 }} camera={{ near: 0.1, far: 5000 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FromJSON />
          </Suspense>

          <Dolly
            posNumber={posNumber}
            animationStarted={animationStarted}
            animationTime={animationTime}
            saveAnimationTime={saveAnimationTime}
            inReverse={inReverse}
          />
        </Canvas>
      </div>
    </div>
  );
}
AnimatedScene.propTypes = {
  posNumber: PropTypes.number.isRequired,
  saveAnimationTime: PropTypes.func.isRequired,
  animationStarted: PropTypes.bool.isRequired,
  animationTime: PropTypes.number,
  inReverse: PropTypes.bool.isRequired,
};

AnimatedScene.defaultProps = {
  animationTime: 0,
};
