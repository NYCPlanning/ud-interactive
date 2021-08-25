import React from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { useSnapshot } from 'valtio'

import { state } from '../state'


const Annotation = ({ text, ...props }) => {
  const p1 = new THREE.Vector3()
  const p0 = p1.clone()
  p0.y = -100

  const leaderLine = new THREE.BufferGeometry().setFromPoints([p0, p1])

  return (
    <group {...props}>
      <line geometry={leaderLine} >
        <lineBasicMaterial attach="material" color={0xffffff} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line>
      <Html>
        <div className='caption'>
          {text}
        </div>
      </Html>
    </group>
  )
}


const Annotations = () => {
  const { scene, showAnnotations } = useSnapshot(state)
  const annos = scene ? scene.children.filter((o) => o.name.startsWith('anno')) : []
  const annoComponents = annos.map((a) => <Annotation key={a.uuid} position={a.position} text={a.userData.text} /> )
  
  return (
    <>
      {showAnnotations && annoComponents}
    </>
  )
}

export default Annotations
