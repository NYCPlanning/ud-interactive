/*

Component to interact with the scene camera,
change its location, direction and parameters
in response to changes in state.

*/

import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useSpring, a, config } from '@react-spring/three'
import { useSnapshot } from 'valtio'

import { state } from '../state'


const initCamera = {
  matrix: new THREE.Matrix4(),
  fov: 50
}

const springConfig = config.molasses // or an object with custom params


// instead of animating position and target, we want to animate
// matrixWorld and fov, possibly also near and far although
// those can be defaults
const AnimatedCamera = () => {
  const ref = useRef()
  const set = useThree((threeState) => threeState.set)
  const { cameras: exportedCameras, index } = useSnapshot(state)
  const [ current, setCurrent ] = useState(initCamera)
  const [ cached, setCached ] = useState(initCamera)
  const spring = useSpring({
    config: springConfig,
    matrix: current.matrix,
    from: {
      matrix: cached.matrix,
    },
  })

  // sets the scene default camera to this one
  useEffect(() => { void set({ camera: ref.current }) }, [ref])

  // when scene index changes, set the current camera parameters
  // this triggers the camera animation
  useEffect(() => {
    if ( !exportedCameras.length ) return null
    const nextView = exportedCameras[index]
    const m = nextView.matrixWorld.toArray()
    setCurrent({matrix: m})
  }, [exportedCameras, index])

  return (
    <a.perspectiveCamera ref={ref} matrixAutoUpdate={false} matrix={spring.matrix} />
  )
}

export default AnimatedCamera
