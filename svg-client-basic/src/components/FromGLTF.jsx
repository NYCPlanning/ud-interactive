import React from 'react';
import PropTypes from 'prop-types';
import { useGLTF } from '@react-three/drei';

export default function FromGLTF(props) {
  const { src } = props;
  const { scene, cameras } = useGLTF(src);
  console.log('loaded GLTF');
  return (
    <primitive object={scene} dispose={null} scale={[3.2, 3.2, 3.2]} rotation={[0, Math.PI, 0]} />
  );
}

FromGLTF.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  src: PropTypes.string.isRequired,
  // posNumber: PropTypes.number.isRequired,
};
