import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import Streetscapes from './StreetscapesCompressed';

export default function TestView() {
  return (
    <Canvas style={{ height: 400, width: 800 }}>
      <pointLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Streetscapes />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
