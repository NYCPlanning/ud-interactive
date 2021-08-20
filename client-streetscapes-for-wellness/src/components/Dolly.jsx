/* eslint-disable no-param-reassign */

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { state, updateTimePos, updateAnimations } from '../state';
import Animation from '../classes/Animation';

// function positionCalc(oldPositions, newPositions, currentAnimProgress) {
//   // console.log(
//   //   `old positions: ${JSON.stringify(oldPositions)}\n new positions: ${JSON.stringify(
//   //     newPositions
//   //   )} \n currentAnimProgress: ${currentAnimProgress}`
//   // );
//   const x = THREE.MathUtils.lerp(oldPositions.x, newPositions.x, currentAnimProgress);
//   const y = THREE.MathUtils.lerp(oldPositions.y, newPositions.y, currentAnimProgress);
//   const z = THREE.MathUtils.lerp(oldPositions.z, newPositions.z, currentAnimProgress);
//   return new THREE.Vector3(x, y, z);
// }


export default function Dolly() {
  const snapshot = useSnapshot(state);

  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();
    const { currAnimStartPos, currAnimEndTime, currAnimStartTime, currAnimEndPos, hasLoaded } = snapshot;
    // const testObj = { currAnimStartTime, currAnimEndTime, currAnimStartPos, currAnimEndPos };
    // console.log(JSON.stringify(testObj));
    // console.log(currAnimEndTime - currAnimStartTime);
    if(!hasLoaded) {
      return;
    }
    let currentAnimProgress =
      (elapsedTime - currAnimStartTime) / (currAnimEndTime - currAnimStartTime);
    if (currentAnimProgress <= 0) {
      currentAnimProgress = 0.001;
    }
    if (currentAnimProgress >= 1) {
      currentAnimProgress = 1;
    }
    // console.log(currentAnimProgress);
    // const currentPosition = positionCalc(currAnimStartPos, currAnimEndPos, currentAnimProgress);

    // const currentLookAt = positionCalc(
    //   currAnimStartPos.lookAt,
    //   currAnimEndPos.lookAt,
    //   currentAnimProgress
    // );

    // console.log(currentRotate);

    const fullPosition = {
      matrixWorld: Animation.matrixDiff(currAnimStartPos.matrixWorld, currAnimEndPos.matrixWorld, currentAnimProgress),
      fov: THREE.MathUtils.lerp(currAnimStartPos.fov, currAnimEndPos.fov, currentAnimProgress),
      near: THREE.MathUtils.lerp(currAnimStartPos.near, currAnimEndPos.near, currentAnimProgress),
      far: THREE.MathUtils.lerp(currAnimStartPos.far, currAnimEndPos.far, currentAnimProgress),
    };

    updateTimePos(elapsedTime, fullPosition);
    if (elapsedTime >= currAnimEndTime) {
      updateAnimations(elapsedTime, fullPosition);
    }
    camera.fov = fullPosition.fov;
    camera.near = fullPosition.near;
    camera.far = fullPosition.far;
    camera.updateProjectionMatrix();
    camera.matrixAutoUpdate = false;
    camera.matrixWorld = fullPosition.matrixWorld;
    camera.updateMatrix();

  });
  return null;
}
