import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import FromGLTF from './FromGLTF'
import Dolly from './AltDolly'
import Sun from './Sun'
import Annotations from './Annotations'

import model from '../assets/model.glb'

const AnimatedScene = () => (
  <Canvas shadows id='r3f-root'>
    <Sun />
    <ambientLight intensity={0.66} color={0xebf2ff}/>
    <Suspense fallback={null} >
      <FromGLTF src={model} />
    </Suspense>
    <Annotations />
    <Dolly />
    <fog attach='fog' args={['#cecfd1', 500, 2500]} />
  </Canvas>
)

export default AnimatedScene
