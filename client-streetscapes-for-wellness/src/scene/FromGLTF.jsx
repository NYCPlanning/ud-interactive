import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { meshBounds, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ref, useSnapshot } from 'valtio';

import { state } from '../state';

const neutralColor = new THREE.Color(1, 1, 1);
const highlightColor = new THREE.Color(0xe0a254);


const FromGLTF = ({ src }) => {
  let { scene, cameras } = useGLTF(src);
  const { dematerialize } = useSnapshot(state);
  let origMaterials = [];

  // pass loaded cameras to state for navigation
  state.cameras = ref(cameras)
  state.scene = ref(scene)

  // apply shadows
  scene.traverse((o) => {
    if ( o.name === 'buildings' || o.name === 'ekevated' || o.name === 'bench' ) {
      // console.log(o)
      o.castShadow = true;
    }

    if ( o.name === 'sidewalk' || o.name === 'hardscape' ) {
      // console.log(o)
      o.receiveShadow = true;
    }

    //note original materials
    if ( o.type === 'Mesh') {
      origMaterials.push({'uuid': o.uuid, 'color': o.material.color});
    }
  });

  useEffect(() => {
    if ( dematerialize ) {
      // console.log('dematerializing')
      scene.traverse((o) => {
        if ( o.type === 'Mesh' && o.material.name != 'HIGHLIGHT_COLOR') {
          o.material.color = neutralColor;
          o.material.needsUpdate = true
        }

        // if ( o.type === 'Mesh' &&  ) {
        //   o.material.color = highlightColor;
        //   o.material.needsUpdate = true
        // }
      })
    }
    // } else {
    //   scene.traverse((o) => {
    //     if ( o.type === 'Mesh') {
    //       o.material.color = o.material.originalColor;
    //       o.material.needsUpdate = true
    //     }

    //     if ( o.type === 'Mesh' && o.material.name === 'HIGHLIGHT_COLOR' ) {
    //       o.material.color = o.material.originalColor;
    //       console.log(o.material.originalColor)
    //       o.material.needsUpdate = true
    //     }
    //   })
    // }
  }, [dematerialize]);

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
