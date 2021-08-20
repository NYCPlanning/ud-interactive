import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FromGLTF from './FromGLTF';
import Dolly from './Dolly';
import AltDolly from './AltDolly';

import model from '../assets/model.glb';


const AnimatedScene = () => (
  <Canvas id='r3f-root' >
    <pointLight position={[0, 1000, 0]} />
    <Suspense fallback={null}>
      <ambientLight intensity={5} position={[0, 100, 0]} />
      <FromGLTF src={model} />
    </Suspense>
    <Dolly />
    {/* <AltDolly /> */}
  </Canvas>
);


export default AnimatedScene;
