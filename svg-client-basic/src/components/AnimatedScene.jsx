/* eslint-disable no-nested-ternary */
import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { AxesHelper } from 'three';
import * as THREE from 'three';
import { useGLTF, OrbitControls } from '@react-three/drei';

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/extensions
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Background from './Background';

// import Streetscapes from './Streetscapes';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';
import lightingtest from '../assets/lightingtest.json';
// import combinedscene from '../assets/combinedscene.json';
import buildings from '../assets/buildings_ground_graylight.json';
// import furnishings1 from '../assets/viewfurnishings.json';
// import furnishing2 from '../assets/furnishings.json';

// import threedfurnishings from '../assets/furnishings/furnishings_3dfurnishings.json';
import facadedetails from '../assets/furnishings/furnishings_facadedetail.json';
import glassfacade from '../assets/furnishings/furnishings_glassfacade.json';
import greenery from '../assets/furnishings/furnishings_greenery.json';
import highlights from '../assets/furnishings/furnishings_highlights.json';
import vehicleglass from '../assets/furnishings/furnishings_vehicleglass.json';

import commercialView from '../assets/rhino-views/commercial-elevated.png';
import industrialView from '../assets/rhino-views/industrial.png';
import parkView from '../assets/rhino-views/park.png';
import residentialView from '../assets/rhino-views/residential.png';

import streetscapeGltf from '../assets/background/rescaled.glb';
import streetscapeJson from '../assets/buildingsgroundupdate.json';

/*
 * double check weird problematic value from rhino
 * look into switching models in loader
 */

const rhinoViews = [commercialView, industrialView, parkView, residentialView];

const furnishings = [
  // threedfurnishings,
  // facadedetails,
  glassfacade,
  greenery,
  highlights,
  vehicleglass,
];

function getViewSRC(posNumber) {
  return rhinoViews[posNumber];
}

const modelMode = 2;
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
function getFOV(lensLength) {
  return THREE.MathUtils.lerp(73.7, 39.6, (lensLength - 23) / (50 - 23));
}
function convertToThree(position) {
  return {
    x: -position.x,
    y: position.z,
    z: position.y,
    fov: getFOV(position.lensLength),
    lookAt: {
      x: -position.lookAt.x,
      y: position.lookAt.z,
      z: position.lookAt.y,
    },
  };
}

function makeAllThree(positions) {
  const array = [];
  for (let i = 0; i < positions.length; i += 1) {
    array.push(convertToThree(positions[i]));
  }
  return array;
}

// not able to get showSample functionality up and working yet
function getCamPositions() {
  switch (modelMode) {
    case 1:
      return rhinoStuff;
    case 2:
      return makeAllThree(rhinoStuff);
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
    // eslint-disable-next-line no-param-reassign
    // camera.fov = currentPosition.fov;
    camera.lookAt(currentLookAt);
    // camera.updateProjectionMatrix();
  });
  return null;
}

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(streetscapeJson);
  return <primitive object={scene} dispose={null} />;
};

const FromGLTF = () => {
  const { scene } = useGLTF(streetscapeGltf);
  return (
    <primitive object={scene} dispose={null} scale={[3.2, 3.2, 3.2]} rotation={[0, Math.PI, 0]} />
  );
};

export default function AnimatedScene(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime, inReverse } = props;
  positionText(posNumber);
  originalPositionText(posNumber);
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height: 300, width: 800 }} camera={{ fov: 70, near: 10, far: 7500 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <axesHelper args={[1000]} />
          {/* <OrbitControls /> */}
          {/* <Streetscapes /> */}
          <Suspense fallback={null}>
            <FromGLTF />
            {/* <FromJSON /> */}
          </Suspense>
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
