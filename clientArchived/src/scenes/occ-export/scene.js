import React, { useRef, Suspense } from 'react';
import { Canvas, useThree, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import data from './data.json'

// activate controls
extend({ OrbitControls });

// object from json
const FromJSON = () => {
  console.log(data)
  // const loader = new THREE.ObjectLoader();
  const loader = new THREE.BufferGeometryLoader();
  const obj = loader.parse(data);
  console.log(obj)

  const mat = new THREE.MeshStandardMaterial({color: 0xff00ff});

  return <mesh geometry={obj} material={mat} />
}

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  return (
    <orbitControls 
      autoRotate
      autoRotateSpeed={0.25}
      maxPolarAngle={Math.PI/2} // use to restrict movement of the camera
      // minPolarAngle={Math.PI/4} // use to restrict movement of the camera
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
};

// primary scene component
export default ({ buildings, fogStart }) => {
  return (
      <div className='w-screen h-screen pointer-events-none overflow-y-hidden'>
          <div className='w-full h-full three-canvas pointer-events-auto'>
            <Canvas>
              <Controls />
              <pointLight position={[10, 10, 10]} />
              <ambientLight intensity={0.50} />
              <Suspense fallback={null}>
                <FromJSON />
              </Suspense>
              {/* <fog attach='fog' args={['#e4e3be', 2, 10]} /> */}
            </Canvas>
      </div>
    </div>
  );
}
