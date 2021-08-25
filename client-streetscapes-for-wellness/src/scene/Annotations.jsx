import React, { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import { useSnapshot } from 'valtio'

import { state } from '../state'


const Annotation = ({ text, ...props }) => (
  <Html {...props} >
    <div className='bg-white p-2'>
      {text}
    </div>
  </Html>
)


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
