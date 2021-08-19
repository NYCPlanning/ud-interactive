import React from 'react';
import PropTypes from 'prop-types';
import { useGLTF } from '@react-three/drei';
import { ref } from 'valtio';

import { state } from '../state';


const FromGLTF = ({ src }) => {
  const { scene, cameras } = useGLTF(src);

  // pass loaded cameras to state for navigation
  state.cameras = ref(cameras)

  // traverse the scene and adjust settings
  scene.traverse((o) => {
    if ( o.type === 'Mesh' && o.name === 'buildings') {
      o.castShadow = true;
    }
  });

  return (
    <primitive
      object={scene}
      dispose={null}
      // onClick={handleClick}
    />
  );
}

FromGLTF.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  src: PropTypes.string.isRequired,
};

export default FromGLTF
