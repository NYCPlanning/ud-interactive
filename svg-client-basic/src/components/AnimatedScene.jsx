/* eslint-disable no-nested-ternary */
import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';

import FromGLTF from './FromGLTF';
import Dolly from './Dolly';
import useWindowDimensions from '../useWindowDimensions';

import facadedetails from '../assets/furnishings/furnishings_facadedetail.json';
import glassfacade from '../assets/furnishings/furnishings_glassfacade.json';
import greenery from '../assets/furnishings/furnishings_greenery.json';
import highlights from '../assets/furnishings/furnishings_highlights.json';
import vehicleglass from '../assets/furnishings/furnishings_vehicleglass.json';

import streetscapeGltf from '../assets/background/rescaled-edges.glb';
import august10Gltf from '../assets/background/2021-08-10.glb';
import buggy from '../assets/testglb/Buggy.glb';

/*
 * responsiveness to window size changing
 * regaining controls / free navigation
 * put a cube into the scene / make it work with pointer - pointer-based interactivity
 */

const imports = [streetscapeGltf, august10Gltf];

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
  const src = imports[1];
  const { height, width } = useWindowDimensions();
  const {
    untimedAnimation,
    setUntimedAnimation,
    setAnimationStack,
    currAnimStartTime,
    currAnimStartPos,
    currAnimEndTime,
    currAnimEndPos,
    setCurrentTime,
    setCurrentPos,
  } = props;
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
          <Dolly
            setCurrentTime={setCurrentTime}
            setCurrentPos={setCurrentPos}
            currAnimStartTime={currAnimStartTime}
            currAnimStartPos={currAnimStartPos}
            currAnimEndTime={currAnimEndTime}
            currAnimEndPos={currAnimEndPos}
          />
        </Canvas>
      </div>
    </div>
  );
}

AnimatedScene.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  untimedAnimation: PropTypes.object.isRequired,
  setUntimedAnimation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // animationStack: PropTypes.object.isRequired,
  setAnimationStack: PropTypes.func.isRequired,
  currAnimStartTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currAnimStartPos: PropTypes.object.isRequired,
  currAnimEndTime: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currAnimEndPos: PropTypes.object.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  setCurrentPos: PropTypes.func.isRequired,
};
