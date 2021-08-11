/* eslint-disable no-param-reassign */
import React from 'react';
import { Vector3 } from 'three';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

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
    // console.log(JSON.stringify(testObj));

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
    // const currentRotate = positionCalc(
    //   currAnimStartPos.rotate,
    //   currAnimEndPos.rotate,
    //   currentAnimProgress
    // );

    // const fullPosition = {
    //   x: currentPosition.x,
    //   y: currentPosition.y,
    //   z: currentPosition.z,
    //   rotate: {
    //     x: currentRotate.x,
    //     y: currentRotate.y,
    //     z: currentRotate.z,
    //   },
    //   fov: THREE.MathUtils.lerp(currAnimStartPos.fov, currAnimEndPos.fov, currentAnimProgress),
    //   near: THREE.MathUtils.lerp(currAnimStartPos.near, currAnimEndPos.near, currentAnimProgress),
    //   far: THREE.MathUtils.lerp(currAnimStartPos.far, currAnimEndPos.far, currentAnimProgress),
    // };
    const fullPosition = {
      x: currentPosition.x,
      y: currentPosition.y,
      z: currentPosition.z,
      lookAt: {
        x: currentLookAt.x,
        y: currentLookAt.y,
        z: currentLookAt.z,
      },
    };

    logTimePos(elapsedTime, fullPosition);
    if (movementBeingAdded || elapsedTime >= currAnimEndTime) {
      updateAnimations(elapsedTime, fullPosition);
    }

    camera.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    camera.lookAt(currentLookAt);
    // camera.rotate.x = currentRotate.x;
    // camera.rotate.y = currentRotate.y;
    // camera.rotate.z = currentRotate.z;
    // camera.fov = fullPosition.fov;
    // camera.near = fullPosition.near;
    // camera.far = fullPosition.far;
  });
  return null;
}
