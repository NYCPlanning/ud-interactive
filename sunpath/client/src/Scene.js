import React, { useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
// import * as THREE from 'three'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'

import Sun from './Sun'
import model from './model.glb'


const Model = (props) => {
  // const snap = useSnapshot(state);
  const { scene, animations } = useGLTF(model)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    actions.propellerAction.play()
  }, [actions])

  scene.traverse((o) => {
    // by material
    if ( o.material ) {
      switch ( o.material.name ) {
        case 'GROUND':
        case 'CONCRETE':
        case 'ASPHALT':
        case o.material.name.includes('ROOF'):
          o.receiveShadow = true
          break
        case 'BRICK':
        case 'STEEL':
          o.castShadow = true
          break
      }
    }
  })

  return <primitive {...props} object={scene} />
}


// const GroundPlane = () => {
//   return (
//     <mesh receiveShadow rotation={[-Math.PI/2,0,0]}>
//       <planeBufferGeometry args={[100,100]} />
//       <meshStandardMaterial color='white' />
//     </mesh>
//   )
// }

// const Cube = () => {
//   return (
//     <mesh castShadow position={[2, 2, 2]} >
//       <boxGeometry args={[10,10,10]} />
//       <meshStandardMaterial color='green' />
//     </mesh>
//   )
// }



const Scene = () => {

  const cameraParams = {
    left: 10,
    right: -10,
    top: 10,
    bottom: -10,
    zoom: 3,
    position: [-400, 600, 200],
    near: 1,
    far: 1600
  }

  return (
    <Canvas
      id='scene-root'
      orthographic
      shadows
      camera={cameraParams}
    >
      {/*<axesHelper scale={[20,20,20]} />*/}
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Sun />
      <Suspense fallback={null}>
        {/* <Windmill position={[1, 9, 12]} rotation={[0, 0.1, 0]} /> */}
        <Model rotation={[0, Math.PI - 0.505, 0]} />
      </Suspense>
      {/* <Cube />
      <GroundPlane /> */}
      <fog attach='fog' args={['#e4e3be', 775, 900]} />
    </Canvas>
  )
}

export default Scene
