/* eslint-disable  */
import React, { useState, Suspense } from 'react';
import { useThree, Canvas, useFrame } from 'react-three-fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { a } from '@react-spring/three';
import { DragControls } from 'three';
import { OrbitControls, Stats, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import { useSpring, animated, config, to } from 'react-spring';

// exported scene from rhino/triceratops
import sample from '../assets/sample.json';
import testscene from '../assets/testscene.json';
import lightingtest from '../assets/lightingtest.json';

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

const timePer = 2;

function Dolly(props) {
  const { posNumber, animationStarted, animationTime, saveAnimationTime } = props;
  // This one makes the camera move in and out
  // const { x, y, z } = useSpring({
  //   from: { x: 40, y: 0, z: -40 },
  //   to: { x: 60, y: 0, z: -20 },
  // });

  useFrame(({ clock, camera }) => {
    // console.log('animation started? ' + animationStarted);
    if (animationStarted) {
      console.log('animation started in Dolly');
      saveAnimationTime(clock.getElapsedTime());
    }
    if (posNumber < camPositions.length - 1) {
      console.log('animationTime! ' + animationTime);
      let currentAnimProgress = (clock.getElapsedTime() - animationTime) / timePer;
      if (currentAnimProgress > 1) {
        currentAnimProgress = 0.999;
      }
      const x = THREE.MathUtils.lerp(
        camPositions[posNumber].x,
        camPositions[posNumber + 1].x,
        currentAnimProgress
      );
      const y = THREE.MathUtils.lerp(
        camPositions[posNumber].y,
        camPositions[posNumber + 1].y,
        currentAnimProgress
      );
      const z = THREE.MathUtils.lerp(
        camPositions[posNumber].z,
        camPositions[posNumber + 1].z,
        currentAnimProgress
      );
      console.log('x: ' + x + ', y: ' + y + ', z: ' + z);
      camera.position.set(x, y, z);
    }
    // const { x, y, z } = givePosition(180, clock.getElapsedTime());
    // const { x, y, z } = snapPosition(posNumber);
    // camera.position.set(x, y, z);
    camera.lookAt(50, 5, 0);
  });
  return null;
}

export default function Triceratops(props) {
  const { x, y, z } = useSpring({
    from: {
      x: 100,
      y: 50,
      z: 0,
    },
    to: {
      x: 400,
      y: 200,
      z: 100,
    },
  });
  const { posNumber, animationStarted, animationTime, saveAnimationTime } = props;
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        {/* this works! */}
        {/* <Canvas
          camera={{ fov: 75, near: 0.1, far: 1000, position: [100, 50, 0] }}
          style={{ height: 400, width: 800 }}
        > */}
        <Canvas
          // camera={{ fov: 75, near: 0.1, far: 1000, position: [x, y, z] }}
          style={{ height: 400, width: 800 }}
        >
          {/* this also works! */}
          {/* <PerspectiveCamera
            position={[100, 50, 0]}
            fov={75}
            near={0.1}
            far={1000}
            lookAt={(50, 5, 0)}
            makeDefault
          /> */}

          {/* <Canvas style={{ height: 400, width: 800 }}> */}
          {/* <PerspectiveCamera
            position={(40, 0, -40)}
            lookAt={(50, 5, 0)}
            fov={35}
            near={0.1}
            far={10000}
            makeDefault
          > */}
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FromJSON />
          </Suspense>
          {/* useDrag hook? within react? seems irrelevant */}
          {/* https://codesandbox.io/s/vibrant-swanson-g8g7q?file=/src/index.js:185-191 */}
          <Dolly
            posNumber={posNumber}
            animationStarted={animationStarted}
            animationTime={animationTime}
            saveAnimationTime={saveAnimationTime}
          />
          {/* <Dolly /> */}
          {/* </PerspectiveCamera> */}
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
}
Triceratops.propTypes = {
  posNumber: PropTypes.number.isRequired,
  saveAnimationTime: PropTypes.func.isRequired,
  animationStarted: PropTypes.bool.isRequired,
  animationTime: PropTypes.number,
};

Triceratops.defaultProps = {
  animationTime: 0,
};

// const camPositions = [
//   {
//     x: 40,
//     y: 0,
//     z: -40,
//   },
//   {
//     x: 60,
//     y: 0,
//     z: -20,
//   },
//   { x: 80, y: 10, z: -30 },
//   {
//     x: 100,
//     y: -10,
//     z: -40,
//   },
// ];

// function calcNew(oldDim, newDim, timePer, timeFromLast) {
//   const diff = newDim - oldDim;
//   const speed = diff / timePer;
//   const toTravel = speed * timeFromLast;
//   return oldDim + toTravel;
// }

// function givePosition(speed, elapsedTime) {
//   const timePer = (1 / speed) * 1000;
//   const currentPos = Math.floor(elapsedTime / timePer);
//   if (currentPos < camPositions.length - 1) {
//     let { x, y, z } = camPositions[currentPos];
//     const timeFromLast = elapsedTime - timePer * Math.floor(elapsedTime / timePer);
//     x = calcNew(x, camPositions[currentPos + 1].x, timePer, timeFromLast);
//     y = calcNew(y, camPositions[currentPos + 1].y, timePer, timeFromLast);
//     z = calcNew(z, camPositions[currentPos + 1].z, timePer, timeFromLast);
//     return { x, y, z };
//   }
//   return camPositions[camPositions.length - 1];
// }

// function snapPosition(posNumber) {
//   if (posNumber >= camPositions.length) {
//     const { x, y, z } = camPositions[camPositions.length - 1];
//     return { x, y, z };
//   }
//   const { x, y, z } = camPositions[posNumber];
//   return { x, y, z };
// }

// const [flip, set] = useState(false);
// const props = useSpring({
//   from: { x: 40, y: 0, z: -40 },
//   to: { x: 60, y: 0, z: -20 },
//   reset: true,
//   reverse: flip,
//   delay: 200,
//   config: config.molasses,
//   onRest: () => set(!flip),
// });
// return (
//   <animated.PerspectiveCamera
//     position={(props.x, props.y, props.z)}
//     near={0.1}
//     far={10000}
//     fov={70}
//     aspect={2}
//   />
// );
// const { x, y, z } = useSpring({
//   from: { x: 0, y: 0, z: 0 },
//   to: { x: 40, y: 0, z: -40 },
// });
// return (
//   <animated.PerspectiveCamera position={(x, y, z)} near={0.1} far={10000} fov={70} aspect={2} />
// );
// return (
//   // <PerspectiveCamera
//   //   position={(40, 0, -40)}
//   //   lookAt={(50, 5, 0)}
//   //   fov={35}
//   //   makeDefault
//   //   {...props}
//   // />
// );
// https://spectrum.chat/react-three-fiber/general/calling-usespring-set-in-useframe~c74107e3-9110-48d8-9ed2-27c6a58a26f1
// https://codesandbox.io/s/react-three-fiber-gestures-fig3s?from-embed
// const {size, viewport } = useThree();
// const aspect = size.width / viewport.width;
// const [spring, set] = useSpring(() => ({position: [0,0,0] lookAt: [50, 5, 0]})
