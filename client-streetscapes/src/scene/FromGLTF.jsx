import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { ref, useSnapshot } from 'valtio'

import { neutralColor } from '../config.json'
import { state } from '../state'


const FromGLTF = ({ src }) => {
  let { scene, cameras } = useGLTF(src)
  const { index, dematerialize } = useSnapshot(state)

  useEffect(() => {
    const { userData: { title }} = scene
    const { userData: { viewName }} = cameras[index]

    if ( scene ) state.title = title
    state.cameras = ref(cameras)
    state.scene = ref(scene)
    state.currentViewName = viewName

    scene.traverse((o) => {
      // stash original colors in material userData for dematerialize feature
      if ( o.material ) {
        o.material.userData.originalColor = new THREE.Color()
        o.material.userData.originalColor.copy(o.material.color)
      }

      // cast and receive shadows
      // if ( o.name === 'buildings' || o.name === 'ekevated' || o.name === 'bench' ) {
      //   o.castShadow = true;
      // }
  
      // if ( o.name === 'sidewalk' || o.name === 'hardscape' ) {
      //   o.receiveShadow = true;
      // }

      // adjust scene lights
      // if ( o.type.includes('Light') ) console.log(o)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // dematerialize/rematerialize colors
  useEffect(() => {
    scene.traverse((o) => {
      if ( o.material && dematerialize ) {
        o.material.color.set(neutralColor)
      } else if ( o.material && !dematerialize ) {
        o.material.color.copy(o.material.userData.originalColor)
      }
    })
  }, [scene, dematerialize])

  return (
    <primitive
      object={scene}
      dispose={null}
    />
  )
}

export default FromGLTF
