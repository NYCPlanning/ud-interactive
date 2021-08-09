/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-nested-ternary */
import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { AxesHelper, SrcColorFactor } from 'three';
import { useLoader } from 'react-three-fiber';
// eslint-disable-next-line import/extensions
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import FromJSON from './FromJSON';
import FromGLTF from './FromGLTF';
import VisualDebugger from './VisualDebugger';
import Dolly from './Dolly';
import useWindowDimensions from '../useWindowDimensions';

import facadedetails from '../assets/furnishings/furnishings_facadedetail.json';
import glassfacade from '../assets/furnishings/furnishings_glassfacade.json';
import greenery from '../assets/furnishings/furnishings_greenery.json';
import highlights from '../assets/furnishings/furnishings_highlights.json';
import vehicleglass from '../assets/furnishings/furnishings_vehicleglass.json';

import streetscapeGltf from '../assets/background/rescaled-edges.glb';
import buggy from '../assets/testglb/Buggy.glb';

/*
 * responsiveness to window size changing
 * regaining controls / free navigation
 * put a cube into the scene / make it work with pointer - pointer-based interactivity
 */

const imports = [streetscapeGltf];

const furnishings = [
  // threedfurnishings,
  // facadedetails,
  glassfacade,
  greenery,
  highlights,
  vehicleglass,
];

// function Box({ url }) {
//   const { scene } = useLoader(GLTFLoader, url);
//   const copiedScene = useMemo(() => scene.clone(), [scene]);
//   const prim = useRef();
//   const [hover, setHover] = useState(false);

//   return <primitive ref={prim} object={copiedScene} />;
// }

// Box.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   url: PropTypes.object.isRequired,
//   // posNumber: PropTypes.number.isRequired,
// };

export default function AnimatedScene(props) {
  const {
    animationStarted,
    addAnim,
    addMovement,
    newMovement,
    newMovementDur,
    currentAnimationStartTime,
    currentAnimationStartPosition,
    currentAnimationEndTime,
    currentAnimationEndPosition,
    updateAnimations,
  } = props;
  const src = imports[0];
  const { height, width } = useWindowDimensions();

  // const [modelNum, setModelNum] = useState(0);
  // const [model, setModel] = useState(imports[0]);
  // const onClick = () => {
  //   setModel(imports[modelNum + 1]);
  //   setModelNum(modelNum + 1);
  //   // setModel(imports[1]);
  // };
  console.log(
    `currentAnimationStartPosition: ${currentAnimationStartPosition} currentAnimationStartTime: ${currentAnimationStartTime} currentAnimationEndTime: ${currentAnimationEndTime} currentAnimationEndPosition ${currentAnimationEndPosition}`
  );
  return (
    <div className="w-screen h-screen pointer-events-none overflow-y-hidden">
      <div className="w-full h-full three-canvas pointer-events-auto">
        <Canvas style={{ height, width }} camera={{ fov: 70, near: 10, far: 7500 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <axesHelper args={[1000]} />
          {/* <OrbitControls /> */}
          {/* <Streetscapes /> */}
          <Suspense fallback={null}>
            {/* <FromGLTF src={imports[0]} /> */}
            <FromGLTF src={src} />
            {/* <FromJSON src={streetscapeJson} /> */}
            {/* <Box src={model} /> */}
          </Suspense>
          <Dolly
            addAnim={addAnim}
            addMovement={addMovement}
            newMovement={newMovement}
            newMovementDur={newMovementDur}
            animationStarted={animationStarted}
            currentAnimationStartTime={currentAnimationStartTime}
            currentAnimationStartPosition={currentAnimationStartPosition}
            currentAnimationEndTime={currentAnimationEndTime}
            currentAnimationEndPosition={currentAnimationEndPosition}
            updateAnimations={updateAnimations}
          />
        </Canvas>
        {/* <button type="button" onClick={onClick}>
          Next
        </button> */}
        {/* <VisualDebugger
          posNumber={posNumber}
          modelMode={modelMode}
          rhinoStuff={rhinoStuff}
        /> */}
      </div>
    </div>
  );
}

AnimatedScene.propTypes = {
  animationTime: PropTypes.number,
  addAnim: PropTypes.func.isRequired,
  addMovement: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  newMovement: PropTypes.object.isRequired,
  newMovementDur: PropTypes.number.isRequired,
  currentAnimationStartTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentAnimationStartPosition: PropTypes.object.isRequired,
  currentAnimationEndTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentAnimationEndPosition: PropTypes.object.isRequired,
  animationStarted: PropTypes.bool.isRequired,
  updateAnimations: PropTypes.bool.isRequired,
};

AnimatedScene.defaultProps = {
  animationTime: 0,
};
