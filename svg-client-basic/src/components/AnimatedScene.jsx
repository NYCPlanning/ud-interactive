/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { AxesHelper } from 'three';
import * as THREE from 'three';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';
import lightingtest from '../assets/lightingtest.json';
// import combinedscene from '../assets/combinedscene.json';
import buildings from '../assets/buildings_ground_graylight.json';
// import furnishings1 from '../assets/viewfurnishings.json';
// import furnishing2 from '../assets/furnishings.json';

import commercialView from '../assets/rhino-views/commercial-elevated.png';
import industrialView from '../assets/rhino-views/industrial.png';
import parkView from '../assets/rhino-views/park.png';
import residentialView from '../assets/rhino-views/residential.png';

const rhinoViews = [commercialView, industrialView, parkView, residentialView];

function getViewSRC(posNumber) {
  return rhinoViews[posNumber];
}

const modelMode = 3;

//   // {
//   //   x: 666.25,
//   //   y: 2370.21,
//   //   z: 3443,
//   //   timePer: 4,
//   //   lookAt: {
//   //     x: 361.38,
//   //     y: 5964.4,
//   //     z: 3000,
//   //   },
//   // },
//   {
//     x: 1240,
//     y: 3300,
//     z: 70,
//     timePer: 4,
//     lookAt: {
//       x: -1089,
//       y: -4250,
//       z: -1000,
//     },
//   },
//   {
//     x: 660,
//     y: 2370,
//     z: 4105,
//     timePer: 4,
//     lookAt: {
//       x: -440,
//       y: -5970,
//       z: -4105,
//     },
//   },
//   {
//     x: 875.7,
//     y: 3311.94,
//     z: 41.97,
//     timePer: 4,
//     lookAt: {
//       x: 1001.28,
//       y: 2814.86,
//       z: 104.8,
//     },
//   },
// ];

const rhinoStuff = [
  {
    viewName: 'commercial elevated',
    lensLength: 30,
    x: 1089.69,
    y: 4242.88,
    z: 1003.49,
    lookAt: {
      x: 1240.5,
      y: 3298.8,
      z: 70.06,
    },
  },
  {
    viewName: 'residential view',
    lensLength: 44.73,
    x: 440.49,
    y: 5970.23,
    z: 4105.55,
    lookAt: {
      x: 666.25,
      y: 2370.21,
      z: 4105.55,
    },
  },
  {
    viewName: 'park',
    lensLength: 30,
    x: 2892.82,
    y: 691.15,
    z: 8.68,
    lookAt: {
      x: 2893.02,
      y: 631.28,
      z: 7.58,
    },
  },
  {
    viewName: 'industrial',
    lensLength: 23.16,
    x: 1165.08,
    y: 2741.85,
    z: 582,
    lookAt: {
      x: 1271.96,
      y: 4011.97,
      z: 582,
    },
  },
];

function flipPosLookAt(position) {
  return {
    x: position.lookAt.x,
    y: position.lookAt.y,
    z: position.lookAt.z,
    lookAt: {
      x: position.x,
      y: position.y,
      z: position.z,
    },
  };
}

function flipAll(positions) {
  const array = [];
  for (let i = 0; i < positions.length; i += 1) {
    array.push(flipPosLookAt(positions[i]));
  }
  return array;
}

function makeLookAtNegative(position) {
  return {
    x: position.x,
    y: position.y,
    z: position.z,
    lookAt: {
      x: -position.lookAt.x,
      y: -position.lookAt.y,
      z: -position.lookAt.z,
    },
  };
}

function makeAllNegative(positions) {
  const array = [];
  for (let i = 0; i < positions.length; i += 1) {
    array.push(makeLookAtNegative(positions[i]));
  }
  return array;
}

// not able to get showSample functionality up and working yet
function getCamPositions() {
  switch (modelMode) {
    case 1:
      return rhinoStuff;
    case 2:
      return flipAll(rhinoStuff);
    case 3:
      return makeAllNegative(flipAll(rhinoStuff));
    default:
      return rhinoStuff;
  }
}

function positionText(posNumber) {
  return JSON.stringify(getCamPositions()[posNumber]);
}

function originalPositionText(posNumber) {
  return JSON.stringify(rhinoStuff[posNumber]);
}

const camPositions = getCamPositions();

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(buildings);

  // make materials double-sided
  scene.traverse((o) => {
    // eslint-disable-next-line no-param-reassign
    if (o.material) o.material.side = THREE.DoubleSide;
  });
  return <primitive object={scene} dispose={null} />;
};

const timePer = 2;

function positionCalc(oldPositions, newPositions, currentAnimProgress) {
  // const x = THREE.MathUtils.lerp(oldPositions.x, newPositions.x, currentAnimProgress);
  // const y = THREE.MathUtils.lerp(oldPositions.y, newPositions.y, currentAnimProgress);
  // const z = THREE.MathUtils.lerp(oldPositions.z, newPositions.z, currentAnimProgress);
  // return new THREE.Vector3(x, y, z);
  return new THREE.Vector3(newPositions.x, newPositions.y, newPositions.z);
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
  positionText(posNumber);
  originalPositionText(posNumber);
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height: 300, width: 800 }} camera={{ fov: 70, near: 10, far: 5000 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FromJSON />
          </Suspense>
          {/* <axesHelper args={[1000]} /> */}

          <Dolly
            posNumber={posNumber}
            animationStarted={animationStarted}
            animationTime={animationTime}
            saveAnimationTime={saveAnimationTime}
            inReverse={inReverse}
          />
        </Canvas>
        <img
          style={{ height: 200, width: 'auto' }}
          src={getViewSRC(posNumber)}
          alt="see from rhino"
        />
        <p style={{ fontWeight: 800 }}>MODE</p>
        <p style={{ display: 'inline-block' }}>
          {modelMode === 1
            ? 'regular'
            : modelMode === 2
            ? 'flipped lookAt'
            : modelMode === 3
            ? 'flipped and negative LookAt'
            : 'weird modelMode'}
        </p>
        <p style={{ fontWeight: 800 }}>CURRENTLY DISPLAYED:</p>
        <p style={{ display: 'inline-block' }}>{positionText(posNumber)}</p>
        <p style={{ fontWeight: 800 }}>FROM RHINO:</p>
        <p>{originalPositionText(posNumber)}</p>
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
// if (modelMode === 1) {
//   return [
//     {
//       x: 100,
//       y: 50,
//       z: 0,
//       timePer: 2,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//     {
//       x: 400,
//       y: 200,
//       z: 100,
//       timePer: 0.5,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//     {
//       x: 200,
//       y: 0,
//       z: 50,
//       timePer: 4,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//     {
//       x: -200,
//       y: -100,
//       z: 50,
//       timePer: 1,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//     {
//       x: -300,
//       y: 200,
//       z: 200,
//       timePer: 10,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//   ];
// }
// if (modelMode === 2) {
//   return [
//     {
//       x: 40,
//       y: 0,
//       z: -40,
//       timePer: 10,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//     {
//       x: 600,
//       y: 0,
//       z: -200,
//       timePer: 0.5,
//       lookAt: {
//         x: 50,
//         y: 5,
//         z: 0,
//       },
//     },
//     {
//       x: 2892.82,
//       y: 691.15,
//       z: 5.89,
//       timePer: 2,
//       lookAt: {
//         x: 2893.02,
//         y: 631.28,
//         z: 7.58,
//       },
//     },
//     {
//       x: 875.7,
//       y: 3311.94,
//       z: 41.97,
//       timePer: 4,
//       lookAt: {
//         x: 1001.28,
//         y: 2814.86,
//         z: 104.8,
//       },
//     },
//   ];
// }
// return rhinoStuff;
