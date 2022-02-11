import React, { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { state } from '../services/state'

import {
  existingBuildingRequest,
  getExistingBuilding,
  makeZoningEnvelope,
  scenarioRequest,
  siteRequest,
  zoningLotRequest,
  getZoningLot,
} from '../services/grpc'

import FromJSON from './fromjson'
import FromGLB from './fromglb'
import Ground from './ground'
import Line from './line'
import RealtimePoints from './realtimepoints'

// activate controls
extend({ OrbitControls })

// set z as up
THREE.Object3D.DefaultUp.set(0, 0, 1)

// scale/units
const metersToFeet = [3.2808, 3.2808, 3.2808]

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  return (
    <orbitControls
      autoRotate
      autoRotateSpeed={0.25}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Scene3D = () => {
  const [model, setModel] = useState()
  const [lot, setLot] = useState()

  const snap = useSnapshot(state)

  const zoningLot = zoningLotRequest({
    ...snap.zoningLot,
    site: siteRequest(snap.site),
    scenario: scenarioRequest(snap.scenario),
  })

  const bounds = 'Polygon ((1008193.60197454 233953.99707702, 1008096.94286256 233777.03654891, 1008363.12718634 233664.01974105, 1008445.65919734 233852.13324361, 1008193.60197454 233953.99707702))'

  const bldgRequest = existingBuildingRequest((({ id }) => ({ id }))(state.neighboringBuildings))

  // fetch zoning envelope
  // useEffect(() => {
  //   makeZoningEnvelope({zoningLot: zoningLot, callback: setModel})
  // }, [])

  // fetch zoning lot
  // useEffect(() => {
  //   getZoningLot({request: zoningLot, callback: setLot})
  // }, [])
  
  // fetch existing building
  // useEffect(() => {
  //   getExistingBuilding({request: bldgRequest}).then((res) => {
  //     state.neighboringBuildings.geom = res
  //   })
  // }, [])

  // if (!snap.neighboringBuildings.geom) return <div className='text-white w-full h-full'>Loading...</div>
  return (
    <Canvas 
      id='canvas' 
      className='w-full h-full'
      orthographic
      camera={{ zoom: 2, position: [300, 300, 300] }}
    >
      <axesHelper scale={[100,100,100]} />
      <ambientLight />
      <pointLight position={[100, 100, 100]} />
      {/* <FromJSON data={model} color={0xffeb00} position={[0, 0, 45]} />
      <FromJSON data={snap.neighboringBuildings.geom} color={0x4f69c6} /> */}
      <Suspense fallback={null}>
        <FromGLB scale={metersToFeet} position={[100, 0, 46]} />
      </Suspense>
      <RealtimePoints />
      <Ground bounds={bounds} applyTexture={true} />
      <Line data={lot} />
      <Controls />
    </Canvas>
  )
}

export default Scene3D
