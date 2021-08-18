import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FromGLTF from './FromGLTF';
import Dolly from './Dolly';
import useWindowDimensions from '../useWindowDimensions';

// import glassfacade from '../assets/furnishings/furnishings_glassfacade.json';
// import greenery from '../assets/furnishings/furnishings_greenery.json';
// import highlights from '../assets/furnishings/furnishings_highlights.json';
// import vehicleglass from '../assets/furnishings/furnishings_vehicleglass.json';

import streetscapeGltf from '../assets/background/rescaled-edges.glb';
import august10Gltf from '../assets/background/2021-08-10.glb';

// const furnishings = [glassfacade, greenery, highlights, vehicleglass];

const imports = [streetscapeGltf, august10Gltf];

export default function AnimatedScene() {
  const src = imports[1];
  const { height, width } = useWindowDimensions();
  // const testObj = { currAnimStartTime, currAnimStartPos, currAnimEndTime, currAnimEndPos };
  // console.log(JSON.stringify(testObj));
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas
          style={{ height: (height * 3) / 4, width }}
          camera={{ fov: 70, near: 10, far: 7500 }}
        >
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          {/* <axesHelper args={[1000]} /> */}
          <Suspense fallback={null}>
            <FromGLTF src={src} />
          </Suspense>
          <Dolly />
        </Canvas>
      </div>
    </div>
  );
}
