import React from 'react';
import PropTypes from 'prop-types';
import { useGLTF } from '@react-three/drei';

export default function FromGLTF({ src }) {
  const GLTF = useGLTF(src);
  const { scene } = GLTF;
  console.log(GLTF);
  return (
    <primitive object={scene} dispose={null} scale={[3.2, 3.2, 3.2]} rotation={[0, Math.PI, 0]} />
  );
}

FromGLTF.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  src: PropTypes.string.isRequired,
  // posNumber: PropTypes.number.isRequired,
};
