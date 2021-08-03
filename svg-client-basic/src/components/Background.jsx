import * as THREE from 'three';
import React, { Suspense } from 'react';
import buildings from '../assets/buildings_ground_graylight.json';

export default function Background() {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(buildings);

  // make materials double-sided
  scene.traverse((o) => {
    // eslint-disable-next-line no-param-reassign
    if (o.material) o.material.side = THREE.DoubleSide;
  });
  return (
    <Suspense>
      <primitive object={scene} dispose={null} />
    </Suspense>
  );
}
