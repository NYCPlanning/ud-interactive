/*

Component to interact with the scene camera,
change its location, direction and parameters
in response to changes in state.

*/

import { useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { state } from '../state';


export default function Dolly() {
  const { cameras, index } = useSnapshot(state);
  const { camera } = useThree();

  useEffect(() => {
    if  ( cameras.length === 0 ) return null;
    const currentCamera = cameras[index];

    // apply fov, near, far params
    camera.fov = currentCamera.fov
    camera.near = currentCamera.near
    camera.far = currentCamera.far
    camera.updateProjectionMatrix();

    // apply matrix transform from the current camera
    // to the next one in the scene
    camera.matrixAutoUpdate = false;
    camera.matrixWorld = currentCamera.matrixWorld;
    camera.updateMatrix();

  }, [cameras, index])

  return null;
}
