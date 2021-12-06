/*

This component makes a request to a "sun" service,
for a given date, time and geographic location,
that returns the position of the sun in the sky
and the estimated intensity and color of light.

These are used to define a primary light source
in the 3D scene that illuminates other objects

*/

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'

import state, { getISODateTime } from './state'

const url = "http://localhost:51051/v1/sun"
const sunColor = 0xe9d900;

const Sun = () => {
  const [data, setData] = useState()
  const {
    frame: {
      date,
      time,
      center
    }
  } = useSnapshot(state)

  useEffect(async () => {
    const url = "http://localhost:51051/v1/sun"
    const body = {
      "date_time": getISODateTime(),
      "location": {
          "lat": center[0],
          "lon": center[1],
      }
    }
    const result = await axios.post(url, body)
    setData(result.data)
    state.radiation = result.data.radiation
  }, [date, time, center])

  useEffect(async () => {
    const url = "http://localhost:51051/v1/system/version"
    const result = await axios.get(url)
    state.serverVersion = result.data.version
  }, [])

  if ( !data || data.radiation <= 0 ) return null
  const { azimuth, altitude, radiation, color } = data

  const up = new THREE.Vector3(0, 1, 0)
  const north = new THREE.Vector3(0, 0, 1)
  const east = new THREE.Vector3(1, 0, 0)

  const origin = new THREE.Object3D()
  const target = new THREE.Object3D()
  const vector = north.clone()

  vector.applyAxisAngle(east, -THREE.MathUtils.degToRad(altitude))
  vector.applyAxisAngle(up, -THREE.MathUtils.degToRad(azimuth))

  const distance = 50
  target.translateOnAxis(vector, distance)

  const sunPathMaterial = new THREE.LineDashedMaterial({ color: sunColor })
  const sunPathGeom = new THREE.BufferGeometry()
  sunPathGeom.setFromPoints([origin.position, target.position])

  const sunPathLine = new THREE.Line(sunPathGeom, sunPathMaterial)
  sunPathLine.computeLineDistances()

  return (
    <group>
      <directionalLight
        position={target.position}
        intensity={0.5}
        castShadow
        shadow-mapSize-height={4096}
        shadow-mapSize-width={4096}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <mesh position={target.position} >
        <sphereGeometry args={[2,12,12]}  />
        <meshBasicMaterial color={sunColor} />
      </mesh>
      <primitive object={sunPathLine} />
    </group>
  )
}

export default Sun
