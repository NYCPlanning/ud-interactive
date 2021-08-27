/*

Component to interact with the scene camera,
change its location, direction and parameters
in response to changes in state.

*/

import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useSnapshot } from 'valtio'

import { state } from '../state'

const init = {
  matrix: new THREE.Matrix4().toArray(),
  fov: 50
}

const springConfig = { 
  mass: 1,
  tension: 280,
  friction: 240,
  precision: 0.001
}


const AnimatedCamera = () => {
  const { cameras, index } = useSnapshot(state)
  const ref = useRef()
  const set = useThree((threeState) => threeState.set)
  const size = useThree(({ size }) => size)
  const [ current, setCurrent ] = useState(init)
  const spring = useSpring({
    config: springConfig,
    matrix: current.matrix,
    fov: current.fov,
    from: {
      fov: init.fov,
      matrix: init.matrix,
    },
  })

  // set the default camera to this one
  useEffect(() => { void set({ camera: ref.current }) }, [set, ref])

  // set new camera parameters when index changes
  // this triggers the animation
  // note what's animated is the matrix array
  // not a THREE.Matrix4 object
  useEffect(() => {
    const { current: c } = ref

    if ( cameras.length ) {
      const nextCamera = cameras[index]
      setCurrent({
        matrix: nextCamera.matrixWorld.toArray(),
        fov: nextCamera.fov
      })
    }

    if (c) c.updateProjectionMatrix()
  }, [cameras, index])

  // set correct aspect ratio when the scene renders
  // and on window size changes
  useLayoutEffect(() => {
    const { current: c } = ref
    const { height, width } = size
    if (c) {
      c.aspect = width / height
      c.updateProjectionMatrix()
    }
  }, [ref, size])

  return (
    <a.perspectiveCamera 
      ref={ref} 
      matrixAutoUpdate={false} 
      matrix={spring.matrix} 
      fov={spring.fov}
    />
  )
}

export default AnimatedCamera
