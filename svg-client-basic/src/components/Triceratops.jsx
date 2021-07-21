/* eslint-disable  */
import React, { useState, Suspense } from 'react';
import { useThree, Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';
import testscene from '../assets/testscene.json';
import lightingtest from '../assets/lightingtest.json';

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(sample);

  // make materials double-sided
  scene.traverse((o) => {
    if (o.material) o.material.side = THREE.DoubleSide;
  });
  return <primitive object={scene} dispose={null} />;
};

const camPositions = [
  {
    x: 100,
    y: 50,
    z: 0,
  },
  {
    x: 400,
    y: 200,
    z: 100,
  },
  {
    x: 200,
    y: 0,
    z: 50,
  },
  { x: -200, y: -100, z: 50 },
  { x: -300, y: 200, z: 200 },
];

// const camPositions = [
//   {
//     x: 40,
//     y: 0,
//     z: -40,
//   },
//   {
//     x: 60,
//     y: 0,
//     z: -20,
//   },
//   { x: 80, y: 10, z: -30 },
//   {
//     x: 100,
//     y: -10,
//     z: -40,
//   },
// ];

const timePer = 2;

function Dolly(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime, inReverse } = props;

  useFrame(({ clock, camera }) => {
    let currentAnimProgress = (clock.getElapsedTime() - animationTime) / timePer;
    if (animationStarted) {
      // console.log('animation started in Dolly');
      saveAnimationTime(clock.getElapsedTime());
      currentAnimProgress = 0;
    }
    let posNumberFixed = posNumber;

    if ((!inReverse && posNumber > 0) || (inReverse && posNumber < camPositions.length - 1)) {
      let oldPositions;
      let newPositions;
      // console.log('animationTime! ' + animationTime);
      if (!inReverse && posNumber > 0) {
        //going forward
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
    if (posNumber == 0) {
      camera.position.set(camPositions[0].x, camPositions[0].y, camPositions[0].z);
    }
    camera.lookAt(50, 5, 0);
  });
  return null;
}

export default function Triceratops(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime, inReverse } = props;
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height: 400, width: 800 }}>
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
Triceratops.propTypes = {
  posNumber: PropTypes.number.isRequired,
  saveAnimationTime: PropTypes.func.isRequired,
  animationStarted: PropTypes.bool.isRequired,
  animationTime: PropTypes.number,
};

Triceratops.defaultProps = {
  animationTime: 0,
};
