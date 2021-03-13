import React, { useRef, Suspense, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { AxesHelper } from 'three'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { useGLTF, OrbitControls } from '@react-three/drei'
// import { ContactShadows, Environment, Sky } from '@react-three/drei'
import { proxy, useProxy} from 'valtio'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


import callbox from './callbox.glb'
import cityrack from './cityrack.glb'
import hydrant from './hydrant-dresser.glb'
import barricade from './policebarricade.glb'
import trafficdrum from './trafficdrum.glb'

const GroundPlane = (props) => {
  const [ref] = usePlane(() => ({ 
    position: [0,-0.5,0], 
    rotation: [-Math.PI / 2, 0, 0], 
    ...props 
  }))

  return (
    <mesh ref={ref}>
      <planeGeometry args={[50,50]} />
      <meshBasicMaterial opacity={0} />
    </mesh>
  )
}

const Model = ({glb, ...props}, ) => {
  const [ref] = useBox(() => ({ mass: 1, ...props }))
  const { scene } = useGLTF(glb)
  return (
    <group ref={ref} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

const Light = () => {
  const light = useMemo(() => new THREE.DirectionalLight(0xffffff), [])
  return (
    <>
      <primitive object={light} position={[0, 3, 0]} />
      <primitive object={light.target} position={[1, 0, -1]}  />
    </>
  )
}

// see https://github.com/pmndrs/react-three-fiber/blob/master/markdown/recipes.md
const Camera = (props) => {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => {
    console.log(ref)
    ref.current.updateMatrixWorld()
  })
  return (
    <orthographicCamera ref={ref} {...props} zoom={68} />
  )
}

export default function Scene(props) {
  const canvasProps = {
    'orthographic': true,
    'camera': {
      'bottom': 0,
      'zoom': 68
    }
  }

  return (
    // <Canvas >
    <Canvas {...canvasProps} >
      {/* <Camera /> */}
      <OrbitControls autoRotate autoRotateSpeed={0.25} />
      <Physics>
        <Suspense fallback={null}>
          <Model glb={trafficdrum} position={[-2,5,0]} />
          <Model glb={hydrant} position={[-1,5,0]} />
          <Model glb={callbox} position={[0,5,0]} />
          <Model glb={barricade} position={[1,5, 0]} rotation={[0, 0.1, 0]} />
          <Model glb={cityrack} position={[2,5,0]} />
        </Suspense>
        <GroundPlane />
      </Physics>
      <axesHelper />
      <ambientLight intensity={0.33} />
      <Light />
      {/* <fog attach='fog' args={['#e4e3be', 400, 900]} /> */}
    </Canvas>
  )
}
