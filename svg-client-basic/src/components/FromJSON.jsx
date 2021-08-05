import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

export default function FromJSON({ src }) {
  const loader = new THREE.ObjectLoader();
  const scene = loader.parse(src);
  return <primitive object={scene} dispose={null} />;
}
FromJSON.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  src: PropTypes.object.isRequired,
};
