import React, { useState, Suspense, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, useResource, extend } from 'react-three-fiber'
import { Physics, usePlane, useBox, useParticle } from '@react-three/cannon'
import { useGLTF, OrbitControls, OrthographicCamera, Text, Html } from '@react-three/drei'
import { format } from 'date-fns'
// import { proxy, ref, useProxy} from 'valtio'

import callbox from './callbox.glb'
import cityrack from './cityrack.glb'
import hydrant from './hydrant-dresser.glb'
import barricade from './policebarricade.glb'
import trafficdrum from './trafficdrum.glb'

const dateFormatted = () => format(new Date(), 'hh:mm:ss')

const GroundPlane = (props) => {
  const [ref] = usePlane(() => ({ 
    position: [0,-0.5,0], 
    rotation: [-Math.PI / 2, 0, 0], 
    ...props 
  }))

  return (
    <mesh visible={false} ref={ref}>
      <planeGeometry args={[50,50]} />
    </mesh>
  )
}

const Model = ({glb, ...props}, ) => {
  const [ref] = useBox(() => ({ mass: 1, angularDamping: 1, ...props }))
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

const AdjustableCamera = () => {
  const camera = useResource()
  const { size: { width, height } } = useThree()
  const aabb = new THREE.Box3(new THREE.Vector3(0, -3, -3), new THREE.Vector3(6, 3, 3))
  
  useEffect(() => {
    camera.current.zoom = Math.min(
      width / (aabb.max.x - aabb.min.x),
      height / (aabb.max.y - aabb.min.y)
    )

    // camera.current.position.y = 2.75

    camera.current.updateProjectionMatrix()
  }, [width, height, aabb, camera])

  // useFrame(() => camera.current.updateMatrixWorld())

  return (
    <>
      <OrthographicCamera 
        ref={camera} 
        makeDefault
        position={[0, 2.85, 6]}
        near={-12} 
        far={24} 
      />
      <OrbitControls 
        camera={camera.current} 
        autoRotate 
        autoRotateSpeed={0.25} 
        target={[0, 2.75, 0]} 
      />
    </>
  )
}

const WeatherContent = () => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch("https://api.weather.gov/stations/KNYC/observations/latest")
      .then(res => res.json())
      .then(
        (result) => {
          setWeather(result.properties)
          setLoaded(true)
        },
        (error) => {
          setError(error)
        }
      )
  }, [])

  if (error) return <span></span>
  if (!loaded) return <span></span>
  return (
    <span>nyc_temperature: {weather.temperature.value}°C</span>
  )
}

const WeatherLeader = ({start, end, ...props}) => {
  const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])
  const [ref] = useParticle(() => ({ mass: 1, ...props }))

  return (
    <group ref={ref} dispose={null}>
      <line>
        <geometry vertices={vertices} />
        <lineBasicMaterial color="lime" />
      </line>
      {/* <Text
        color="lime" // default
        anchorX="start" // default
        anchorY="bottom" // default
        position={end}
      >
        current time, nyc: {text}
      </Text> */}
      <Html position={end} className='w-48 lime opacity-60 align-top code tiny'>
        <WeatherContent />
      </Html>
    </group>
  )
}

const LeaderLine = ({start, end, text, ...props}) => {
  const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])
  const [ref] = useBox(() => ({ mass: 1, ...props }))

  return (
    <group ref={ref} dispose={null}>
      <line>
        <geometry vertices={vertices} />
        <lineBasicMaterial color="lime" />
      </line>
      {/* <Text
        color="lime" // default
        anchorX="start" // default
        anchorY="bottom" // default
        position={end}
      >
        current time, nyc: {text}
      </Text> */}
      <Html position={end} className='w-48 lime opacity-60 align-top code tiny'>
        <span>nyc_time: {text}</span>
      </Html>
    </group>
  )
}

export default function Scene(props) {
  const [time, setTime] = useState(dateFormatted())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dateFormatted())
    }, 1000)
  
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Canvas >
      <AdjustableCamera />
      <Physics>
        <Suspense fallback={null}>
          <WeatherLeader position={[-1.66, 18, 1.5]} start={[0,20,0]} end={[0,3.25,0]} />
          <LeaderLine position={[1, 12, -3]} start={[0,20,0]} end={[0,3.5,0]} text={time} />
          <Model glb={trafficdrum} position={[-2,4,-1]} />
          <Model glb={hydrant} position={[-1,8,0]} />
          <Model glb={callbox} position={[0,7,2]} />
          <Model glb={barricade} position={[1,5, 0]} rotation={[0, 0.1, 0]} />
          <Model glb={cityrack} position={[2.25,6,-1]} />
        </Suspense>
        <GroundPlane />
      </Physics>
      {/* <axesHelper /> */}
      <ambientLight color={0xfffecc}  intensity={0.5} />
      <Light />
      {/* <fog attach='fog' args={['#e4e3be', 400, 900]} /> */}
    </Canvas>
  )
}
