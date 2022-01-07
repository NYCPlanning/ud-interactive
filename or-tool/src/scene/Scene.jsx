import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import AnimatedCamera from './AnimatedCamera'
import Annotations from './Annotations'
import FromGLTF from './FromGLTF'
import Loading from './Loading'
import Sun from './Sun'

import model from '../assets/streetscape.glb'

const Scene = () => (
  <Suspense fallback={<Loading />} >
    <Canvas shadows className='sky' >
      <Sun />
      <ambientLight intensity={0.75} color={0xdef1ff}/>
      <AnimatedCamera />
      <FromGLTF src={model} />
      <Annotations />
      <fog attach='fog' args={['#cecfd1', 10, 100]} />
    </Canvas>
  </Suspense>
)

export default Scene
