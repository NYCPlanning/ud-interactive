/* eslint-disable */

import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, Stats } from '@react-three/drei';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(sample);

  // make materials double-sided
  scene.traverse((o) => {
    if (o.material) o.material.side = THREE.DoubleSide;
  });

  return <primitive object={scene} dispose={null} />;
};

export default ({ buildings, fogStart }) => {
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height: 900, width: 800 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FromJSON />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};
