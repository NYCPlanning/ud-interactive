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
  // console.log(
  //   `old positions: ${JSON.stringify(oldPositions)}\n new positions: ${JSON.stringify(
  //     newPositions
  //   )} \n currentAnimProgress: ${currentAnimProgress}`
  // );
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
    currAnimStartTime,
    currAnimStartPos,
    currAnimEndTime,
    currAnimEndPos,
    updateAnimations,
    movementBeingAdded,
    // currentPosition,
    logTimePos,
  } = props;

  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();

    const testObj = { currAnimStartTime, currAnimEndTime, currAnimStartPos, currAnimEndPos };
    console.log(JSON.stringify(testObj));

    // console.log(currAnimEndTime - currAnimStartTime);
    let currentAnimProgress =
      (elapsedTime - currAnimStartTime) / (currAnimEndTime - currAnimStartTime);
    if (currentAnimProgress <= 0) {
      currentAnimProgress = 0.001;
    }
    if (currentAnimProgress >= 1) {
      currentAnimProgress = 1;
    }
    // console.log(currentAnimProgress);
    const currentPosition = positionCalc(currAnimStartPos, currAnimEndPos, currentAnimProgress);
    const currentLookAt = positionCalc(
      currAnimStartPos.lookAt,
      currAnimEndPos.lookAt,
      currentAnimProgress
    );

    const positionWithLookAt = {
      x: currentPosition.x,
      y: currentPosition.y,
      z: currentPosition.z,
      lookAt: {
        x: currentLookAt.x,
        y: currentLookAt.y,
        z: currentLookAt.z,
      },
    };
    logTimePos(elapsedTime, positionWithLookAt);
    if (movementBeingAdded || elapsedTime >= currAnimEndTime) {
      updateAnimations(elapsedTime, positionWithLookAt);
    }

    camera.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    camera.lookAt(currentLookAt);
  });
  return null;
}
