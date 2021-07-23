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
      },
      {
        x: 400,
        y: 200,
        z: 100,
        timePer: 0.5,
      },
      {
        x: 200,
        y: 0,
        z: 50,
        timePer: 4,
      },
      { x: -200, y: -100, z: 50, timePer: 1 },
      { x: -300, y: 200, z: 200, timePer: 10 },
    ];
  }
  return [
    {
      x: 40,
      y: 0,
      z: -40,
      timePer: 10,
    },
    {
      x: 600,
      y: 0,
      z: -200,
      timePer: 0.5,
    },
    { x: 800, y: 100, z: -300, timePer: 2 },
    {
      x: 100,
      y: -100,
      z: -400,
      timePer: 4,
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

let timePer = 2;

function Dolly(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime, inReverse } = props;

  useFrame(({ clock, camera }) => {
    if (posNumber < camPositions.length) {
      timePer = camPositions[posNumber].timePer;
    }
    let currentAnimProgress = (clock.getElapsedTime() - animationTime) / timePer;
    if (animationStarted) {
      // console.log('animation started in Dolly');
      saveAnimationTime(clock.getElapsedTime());
      currentAnimProgress = 0;
    }
    let oldPositions;
    let newPositions;

    if ((!inReverse && posNumber > 0) || (inReverse && posNumber < camPositions.length - 1)) {
      // console.log('animationTime! ' + animationTime);
      if (!inReverse && posNumber > 0) {
        // going forward
        oldPositions = camPositions[posNumber - 1];
        newPositions = camPositions[posNumber];
      } else if (posNumber < camPositions.length - 1) {
        oldPositions = camPositions[posNumber + 1];
        newPositions = camPositions[posNumber];
      } else {
        oldPositions = { x: 0, y: 0, z: 0 };
        newPositions = { x: 1, y: 1, z: 1 };
      }
      if (currentAnimProgress > 1) {
        currentAnimProgress = 1;
      }
      const x = THREE.MathUtils.lerp(oldPositions.x, newPositions.x, currentAnimProgress);
      const y = THREE.MathUtils.lerp(oldPositions.y, newPositions.y, currentAnimProgress);
      const z = THREE.MathUtils.lerp(oldPositions.z, newPositions.z, currentAnimProgress);
      // console.log('x: ' + x + ', y: ' + y + ', z: ' + z);
      camera.position.set(x, y, z);
    }
    if (posNumber === 0) {
      camera.position.set(camPositions[0].x, camPositions[0].y, camPositions[0].z);
    }
    camera.lookAt(50, 5, 0);
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
