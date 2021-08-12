/* eslint-disable no-param-reassign */
import React from 'react';
import { Vector3 } from 'three';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

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

function positionCalc(oldPositions, newPositions, currentAnimProgress) {
  console.log(
    `old positions: ${JSON.stringify(oldPositions)}\n new positions: ${JSON.stringify(
      newPositions
    )} \n currentAnimProgress: ${currentAnimProgress}`
  );
  // the issue is currentAnimProgress!!)
  const x = THREE.MathUtils.lerp(oldPositions.x, newPositions.x, currentAnimProgress);
  const y = THREE.MathUtils.lerp(oldPositions.y, newPositions.y, currentAnimProgress);
  const z = THREE.MathUtils.lerp(oldPositions.z, newPositions.z, currentAnimProgress);
  return new THREE.Vector3(x, y, z);
  //   return new THREE.Vector3(newPositions.x, newPositions.y, newPositions.z);
  // return { x, y, z };
}

const timePer = 10;

export default function Dolly(props) {
  const { stepNum } = props;

  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();

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

    // eslint-disable-next-line prefer-destructuring
    // fullPosition = fromCamerasCamPositions[0];
    // console.log(JSON.stringify(fullPosition));
    // const fullPosition = {
    //   x: currentPosition.x,
    //   y: currentPosition.y,
    //   z: currentPosition.z,
    //   lookAt: {
    //     x: currentLookAt.x,
    //     y: currentLookAt.y,
    //     z: currentLookAt.z,
    //   },
    // };

    // camera.position.set(fullPosition.x, fullPosition.y, fullPosition.z);
    // // camera.lookAt(currentLookAt);
    // camera.rotation.set(fullPosition.rotate.x, fullPosition.rotate.y, fullPosition.rotate.z);
    // camera.fov = fullPosition.fov;
    // camera.near = fullPosition.near;
    // camera.far = fullPosition.far;
  });
  return null;
}
