import React from 'react';
import { Vector3 } from 'three';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import DollyDebugger from './DollyDebugger';
import camPositionsCalc from '../functions/camPositionsCalc';

const camPositions = camPositionsCalc();

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

function positionCalc(oldPositions, newPositions, currentAnimProgress) {
  //   console.log(
  //     `old positions: ${JSON.stringify(oldPositions)}\n new positions: ${JSON.stringify(
  //       newPositions
  //     )} \n currentAnimProgress: ${currentAnimProgress}`
  //   );
  // the issue is currentAnimProgress!!
  const x = THREE.MathUtils.lerp(oldPositions.x, newPositions.x, currentAnimProgress);
  const y = THREE.MathUtils.lerp(oldPositions.y, newPositions.y, currentAnimProgress);
  const z = THREE.MathUtils.lerp(oldPositions.z, newPositions.z, currentAnimProgress);
  return new THREE.Vector3(x, y, z);
  //   return new THREE.Vector3(newPositions.x, newPositions.y, newPositions.z);
  // return { x, y, z };
}

const timePer = 10;

function getTimePer(inReverse, posNumber) {
  // console.log(JSON.stringify(camPositions));
  // console.log(inReverse);
  // console.log(posNumber);
  // if (posNumber < camPositions.length && posNumber >= 0) {
  //   if (!inReverse) {
  //     return camPositions[posNumber].timePer;
  //   }
  //   if (posNumber > 0) {
  //     return camPositions[posNumber - 1].timePer;
  //   }
  // }
  // console.log('uh oh, timePer not working');
  return timePer;
}

export default function Dolly(props) {
  const {
    currentPosition,
    logTime,
    posNumber,
    animationStarted,
    animationTime,
    saveAnimationTime,
    inReverse,
  } = props;

  useFrame(({ clock, camera }) => {
    // let currentAnimProgress =
    //   (clock.getElapsedTime() - animationTime) / getTimePer(camPositions, inReverse, posNumber);
    // console.log(clock.getElapsedTime());
    // console.log(animationTime); // null
    // console.log(getTimePer(camPositions, inReverse, posNumber)); // null
    logTime(clock.getElapsedTime());

    // if (animationStarted) {
    //   // console.log('animation started in Dolly');
    //   saveAnimationTime(clock.getElapsedTime());
    //   currentAnimProgress = 0;
    // }
    // if (currentAnimProgress > 1) {
    //   currentAnimProgress = 1;
    // }
    // // console.log(currentAnimProgress);

    // const { oldPos, newPos } = getPositions(inReverse, posNumber, camPositions.length);
    // const oldPositions = camPositions[oldPos];
    // const newPositions = camPositions[newPos];

    // const oldLookAt = camPositions[oldPos].lookAt;
    // const newLookAt = camPositions[newPos].lookAt;

    // const currentPosition = positionCalc(oldPositions, newPositions, currentAnimProgress);
    // const currentLookAt = positionCalc(oldLookAt, newLookAt, currentAnimProgress);

    // const dollyDebugger = (
    //   <DollyDebugger
    //     oldPositions={oldPositions}
    //     newPositions={newPositions}
    //     oldLookAt={oldLookAt}
    //     newLookAt={newLookAt}
    //     currentPosition={currentPosition}
    //     currentLookAt={currentLookAt}
    //   />
    // );
    // console.log(
    //   `old positions: ${JSON.stringify(oldPositions)}\n new positions: ${JSON.stringify(
    //     newPositions
    //   )}\n current position: ${JSON.stringify(currentPosition)} \n old lookAt: ${JSON.stringify(
    //     oldLookAt
    //   )}\n new lookAt: ${JSON.stringify(newLookAt)}\n current lookAt: ${JSON.stringify(
    //     currentLookAt
    //   )} \n currentAnimProgress: ${currentAnimProgress}`
    // );
    // camera.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    camera.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    camera.lookAt(
      new Vector3(currentPosition.lookAt.x, currentPosition.lookAt.y, currentPosition.lookAt.z)
    );

    // eslint-disable-next-line no-param-reassign
    // camera.fov = currentPosition.fov;
    // camera.lookAt(currentLookAt);
    // camera.updateProjectionMatrix();
    // return dollyDebugger;
  });
  return null;
}
