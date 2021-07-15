/* eslint-disable no-param-reassign */
import React, { Suspense } from 'react';
import { useThree, Canvas, useFrame } from 'react-three-fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { DragControls } from 'three';
import { OrbitControls, Stats, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import { useSpring } from 'react-spring';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';
import testscene from '../assets/testscene.json';
import lightingtest from '../assets/lightingtest.json';

const FromJSON = () => {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(lightingtest);

  // make materials double-sided
  scene.traverse((o) => {
    if (o.material) o.material.side = THREE.DoubleSide;
  });

  return <primitive object={scene} dispose={null} />;
};

const camPositionsOriginal = [
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

const camPositions = [
  {
    x: 40,
    y: 0,
    z: -40,
  },
  {
    x: 60,
    y: 0,
    z: -20,
  },
  { x: 80, y: 10, z: -30 },
  {
    x: 100,
    y: -10,
    z: -40,
  },
];

function calcNew(oldDim, newDim, timePer, timeFromLast) {
  const diff = newDim - oldDim;
  const speed = diff / timePer;
  const toTravel = speed * timeFromLast;
  return oldDim + toTravel;
}

function givePosition(speed, elapsedTime) {
  const timePer = (1 / speed) * 1000;
  const currentPos = Math.floor(elapsedTime / timePer);
  if (currentPos < camPositions.length - 1) {
    let { x, y, z } = camPositions[currentPos];
    const diffX = camPositions[currentPos + 1].x - x;
    const diffY = camPositions[currentPos + 1].y - y;
    const diffZ = camPositions[currentPos + 1].z - z;
    const speedX = diffX / timePer;
    const speedY = diffY / timePer;
    const speedZ = diffZ / timePer;
    const timeFromLast = elapsedTime - timePer * Math.floor(elapsedTime / timePer);
    const ttX = speedX * timeFromLast;
    const ttY = speedY * timeFromLast;
    const ttZ = speedZ * timeFromLast;
    x += ttX;
    y += ttY;
    z += ttZ;
    // x = calcNew(x, camPositions[currentPos + 1].x, timePer, timeFromLast);
    // y = calcNew(y, camPositions[currentPos + 1].y, timePer, timeFromLast);
    // x = calcNew(z, camPositions[currentPos + 1].z, timePer, timeFromLast);
    return { x, y, z };
  }
  return camPositions[camPositions.length - 1];
}

function snapPosition(posNumber) {
  if (posNumber >= camPositions.length) {
    const { x, y, z } = camPositions[camPositions.length - 1];
    return { x, y, z };
  }
  const { x, y, z } = camPositions[posNumber];
  return { x, y, z };
}

function Dolly(props) {
  const { posNumber } = props;
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    // const { x, y, z } = givePosition(500, clock.getElapsedTime());
    const { x, y, z } = snapPosition(posNumber);
    camera.position.set(x, y, z);
    camera.lookAt(50, 5, 0);
  });
  return null;
}

export default function Triceratops(props) {
  const { posNumber } = props;
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height: 400, width: 800 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FromJSON />
          </Suspense>
          <OrbitControls />
          <PerspectiveCamera fov={35} makeDefault />
          <Dolly posNumber={posNumber} />
        </Canvas>
      </div>
    </div>
  );
}
Triceratops.propTypes = {
  posNumber: PropTypes.number.isRequired,
};
