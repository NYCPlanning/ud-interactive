import * as THREE from 'three';
import React, { Suspense } from 'react';
// eslint-disable-next-line import/extensions
import { useGLTF } from '@react-three/drei';

// eslint-disable-next-line import/extensions
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import buildings from '../assets/buildings_ground_graylight.json';

// import Streetscapes from './Streetscapes';
import streetscapesFile from '../assets/background/StreetscapesCompressed.glb';

export default function Background() {
  // const loader = new THREE.ObjectLoader();
  // const scene = loader.parse(buildings);
  // const loader = new GLTFLoader();
  // const scene = loader.parse(streetscapesFile);
  const { scene } = useGLTF(streetscapesFile);

  // make materials double-sided
  scene.traverse((o) => {
    // eslint-disable-next-line no-param-reassign
    if (o.material) o.material.side = THREE.DoubleSide;
  });
  return (
    <Suspense fallback={null}>
      <primitive object={scene} dispose={null} />
    </Suspense>
  );
}
