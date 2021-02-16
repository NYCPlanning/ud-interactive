import React, { useRef, Suspense } from 'react';
import { Canvas, useThree, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// exported scene from rhino/triceratops
import data from './export-data.json'

// activate controls
extend({ OrbitControls });

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(data);

  // make materials double-sided
  scene.traverse((o) => {
    if (o.material) o.material.side = THREE.DoubleSide
  })

  return <primitive object={scene} dispose={null}/>
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
