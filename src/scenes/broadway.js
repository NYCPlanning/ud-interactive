/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'
import broadway from './broadway.glb';

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF(broadway)
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials['sidewalk-concrete']} geometry={nodes.ground_2.geometry} />
      <mesh receiveShadow material={materials.roadbed} geometry={nodes.ground_2_1.geometry} />
      <mesh castShadow material={materials.facade} geometry={nodes['1061959'].geometry} />
      <mesh material={materials['roof-paint']} geometry={nodes['1061959_1'].geometry} />
      <mesh castShadow material={materials.treecanopy} geometry={nodes.trees.geometry} />
    </group>
  )
}

useGLTF.preload('/broadway.glb')
