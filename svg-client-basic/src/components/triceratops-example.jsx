/* eslint-disable */

import React, { Suspense } from 'react';
import { useThree, Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, Stats, PerspectiveCamera } from '@react-three/drei';
import { useSpring } from 'react-spring';

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

const camPositions = [
  {
    x: 100,
    y: 50,
    z: 0,
  },
  {
    x: 400,
    y: 200,
    z: 100,
  },
  {
    x: 200,
    y: 0,
    z: 50,
  },
  { x: -200, y: -100, z: 50 },
  { x: -300, y: 200, z: 200 },
];

function calcNew(oldDim, newDim, timePer, timeFromLast) {
  let diff = newDim - oldDim;
  let speed = diff / timePer;
  let toTravel = speed * timeFromLast;
  return oldDim + toTravel;
}

function givePosition(speed, elapsedTime) {
  let timePer = (1 / speed) * 1000;
  let currentPos = Math.floor(elapsedTime / timePer);
  if (currentPos < camPositions.length - 1) {
    let { x, y, z } = camPositions[currentPos];
    let diffX = camPositions[currentPos + 1].x - x;
    let diffY = camPositions[currentPos + 1].y - y;
    let diffZ = camPositions[currentPos + 1].z - z;
    let speedX = diffX / timePer;
    let speedY = diffY / timePer;
    let speedZ = diffZ / timePer;
    let timeFromLast = elapsedTime - timePer * Math.floor(elapsedTime / timePer);
    let ttX = speedX * timeFromLast;
    let ttY = speedY * timeFromLast;
    let ttZ = speedZ * timeFromLast;
    x = x + ttX;
    y = y + ttY;
    z = z + ttZ;

    //new
    // x = calcNew(x, camPositions[currentPos + 1].x, timePer, timeFromLast);
    // y = calcNew(y, camPositions[currentPos + 1].y, timePer, timeFromLast);
    // x = calcNew(z, camPositions[currentPos + 1].z, timePer, timeFromLast);
    return { x, y, z };
  }
  return camPositions[camPositions.length - 1];
}

function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    let { x, y, z } = givePosition(180, clock.getElapsedTime());
    camera.position.z = z;
    camera.position.y = y;
    camera.position.x = x;
  });
  return null;
}

export default ({ buildings, fogStart }) => {
  const props = useSpring({});
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
          <Dolly />
        </Canvas>
      </div>
    </div>
  );
};
