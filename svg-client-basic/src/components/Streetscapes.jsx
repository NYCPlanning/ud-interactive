/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/Streetscapes.glb');
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Streetscapes_final_1.geometry}
          material={materials.diffuse_0_0_0_255}
        />
        <mesh geometry={nodes.Streetscapes_final_2.geometry} material={materials['Custom (1)']} />
        <mesh geometry={nodes.Streetscapes_final_3.geometry} material={materials.Custom} />
        <mesh geometry={nodes.Streetscapes_final_4.geometry} material={materials['Custom (5)']} />
        <mesh geometry={nodes.Streetscapes_final_5.geometry} material={materials['Custom (4)']} />
        <mesh geometry={nodes.Streetscapes_final_6.geometry} material={materials.Color_D01} />
        <mesh geometry={nodes.Streetscapes_final_7.geometry} material={materials['<LightGray>1']} />
        <mesh geometry={nodes.Streetscapes_final_8.geometry} material={materials.Glass} />
        <mesh geometry={nodes.Streetscapes_final_9.geometry} material={materials['*2']} />
        <mesh geometry={nodes.Streetscapes_final_10.geometry} material={materials['Plaster (3)']} />
        <mesh geometry={nodes.Streetscapes_final_11.geometry} material={materials['Custom (2)']} />
        <mesh geometry={nodes.Streetscapes_final_12.geometry} material={materials.Plaster} />
        <mesh geometry={nodes.Streetscapes_final_13.geometry} material={materials['Custom (3)']} />
        <mesh geometry={nodes.Streetscapes_final_14.geometry} material={materials['Plaster (2)']} />
        <mesh geometry={nodes.Streetscapes_final_15.geometry} material={materials['Plaster (4)']} />
      </group>
    </group>
  );
}

useGLTF.preload('/Streetscapes.glb');