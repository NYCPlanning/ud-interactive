import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import AnimatedCamera from './AnimatedCamera'
import Annotations from './Annotations'
import FromGLTF from './FromGLTF'
import Loading from './Loading'
// import Sun from './Sun'

import model from '../assets/example.glb'


const Scene = () => (
  <Suspense fallback={<Loading />} >
    <Canvas shadows className='sky' >
      {/* <Sun /> */}
      <ambientLight intensity={0.66} color={0xebf2ff}/>
      <AnimatedCamera />
      <FromGLTF src={model} />
      <Annotations />
      <fog attach='fog' args={['#cecfd1', 500, 2500]} />
    </Canvas>
  </Suspense>
)

export default Scene
