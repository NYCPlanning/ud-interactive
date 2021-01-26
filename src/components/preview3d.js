import React, { useRef, Suspense, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { AxesHelper } from 'three';
import { proxy, useProxy} from 'valtio';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ContactShadows, Environment, Sky } from '@react-three/drei';

// DOM elements
import Considerations from './considerations'
import Draft from './draft'

// 3d scene elements
import Broadway from '../scenes/Broadway'
import Building from '../scenes/BroadwayBldg'
import Solarpanels from '../scenes/Solarpanels'

// activate controls
extend({ OrbitControls });

// set z up
// THREE.Object3D.DefaultUp.set(0, 0, 1)

// state object
const state = proxy({
  sunParam: 0.5,
  autoRotate: false,
  currentScene: null
});

const Controls = () => {
  const snap = useProxy(state);
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    if (snap.autoRotate) orbitRef.current.update()
  });

  return (
    <orbitControls 
      autoRotate
      autoRotateSpeed={0.25}
      maxPolarAngle={Math.PI/2} // use to restrict movement of the camera
      // minPolarAngle={Math.PI/4} // use to restrict movement of the camera
      target={[45, 40, 0]}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
};

// points representing a sun path curve on a single day
// get these from rhino > grasshopper > ladybug
const testPts = [
  [303.568404429, 86.9390580107, -88.2372281815],
  [291.122467399, 146.157444276, -37.1980492900],
  [258.843445882, 200.992726767, 9.99893612915],
  [208.931103744, 247.654602168, 50.1295953123],
  [144.789097243, 282.945420098, 80.4735420973],
  [70.7872067594, 304.458554529, 98.9552643665],
  [-8.03197958480, 310.727929967, 104.315028903],
  [-86.2980411542, 301.328146946, 96.1872151779],
  [-158.678648164, 276.903018419, 75.1251583691],
  [-220.239385386, 239.126381139, 42.5578592124],
  [-266.793607620, 190.574511179, 0.714866977047],
  [-295.167510688, 134.581506413, -47.5598904405],
  [-303.430049783, 75.0427384921, -98.9786679098]   
]

function Sun() {
  const snap = useProxy(state);
  const sunColor = 0xe9d900;
  const curvePts = testPts.map((pt) => new THREE.Vector3( ...pt ));
  const sunPath = new THREE.CatmullRomCurve3(curvePts);
  const p = sunPath.getPoint(snap.sunParam);
  const { x, y, z } = p;

  const light = useMemo(() => new THREE.DirectionalLight(0xfff9ab, 1.0), [])
  light.position.set( x, y, z )
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.height = 512
  light.shadow.camera.near = 1
  light.shadow.camera.far = 400
  light.shadow.camera.left = -300;
  light.shadow.camera.right = 300;
  light.shadow.camera.top = 300;
  light.shadow.camera.bottom = -300;
  light.shadow.radius = 4

  //const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
  
  const sunPathMaterial = new THREE.LineDashedMaterial({
    color: sunColor,
    scale: 0.25,
  });
  const sunPathDrawPts = sunPath.getPoints(32);
  const sunPathGeom = new THREE.BufferGeometry().setFromPoints( sunPathDrawPts );
  const sunPathLine = new THREE.Line(sunPathGeom, sunPathMaterial);
  sunPathLine.computeLineDistances();

  const sunGeom = new THREE.SphereGeometry(10, 12, 12)
  const sunMaterial = new THREE.MeshBasicMaterial( {color: sunColor})
  const sunMesh = new THREE.Mesh( sunGeom, sunMaterial )

  return (
    <group scale={[0.5,0.5,0.5]}>
      {/* <primitive object={cameraHelper} /> */}
      <primitive object={sunMesh} position={[ x, y, z ]} />
      <primitive object={light} />
      <primitive object={sunPathLine} />
    </group>
  )
}

const ResidentialBuildings = ({ buildings, fogStart }) => {
  // const snap = useProxy(state);
  const [scene, setScene] = useState(0);

  const handleSliderChange = (e) => {
    e.preventDefault()
    state.sunParam = e.target.value
  }

  const handleSceneMouseOver = ( newScene ) => {
    setScene(newScene)
  }

  return (
    <>
      <div className='w-full h-screen grid grid-cols-4 h-auto pointer-events-none overflow-y-hidden'>
        <div className='col-span-3 h-screen flex flex-col overflow-hidden'>
          <span className='fixed top-0 left-0 w-full p-4 bg-white z-0'><h1>Residential Buildings</h1></span>
          <div className='w-full h-full three-canvas pointer-events-auto'>
            <Canvas
              orthographic
              shadowMap
              shadowmap-type={THREE.VSMShadowMap}
              camera={{left: 10, right: -10, top: 10, bottom: -10, zoom: 3, position: [-400, 600, 200], near: 1, far: 1600 }}
            >
              <Controls />
              <ambientLight intensity={0.75} />
              <Sun />
              <Suspense fallback={null}>
                <Broadway />
                <Building setScene={handleSceneMouseOver} />
                <Solarpanels setScene={handleSceneMouseOver} />
              </Suspense>
              <fog attach='fog' args={['#e4e3be', 775, 900]} />
            </Canvas>
          </div>
        </div>
        <div className='col-start-4 p-4 bg-white shadow-md z-10 pointer-events-auto overflow-scroll'>
          <Considerations
            index={scene} 
            sceneKeys={[
              null,
              'to plan for energy efficiency',
              'the best placement for the vertical circulation core',
            ]}
          />
        </div>
      </div>
      
      <div className='fixed bottom-0 left-0 z-50 m-4 space-x-4 flex pointer-events-auto'>
        <Draft />
        <div id='controls' className='flex items-center justify-between space-x-4 p-2 px-4 bg-white'>
          <span>
            <label htmlFor='sunposition'>Time of Day</label>
            <input
              className='align-middle ml-4'
              id='sunposition'
              type='range' 
              min='0' 
              max='1' 
              defaultValue = '0.5' 
              step='0.01'
              onChange={handleSliderChange}
            />
          </span>
          <span>
            <input
              id='autorotate'
              type='checkbox'
              onClick={(e) => {console.log(e.target.checked);state.autoRotate = e.target.checked}}
            />
            <label htmlFor='autorotate' className='ml-2'>Rotate Model</label>
          </span>
        </div>
      </div>

    </>
  );
}

export default ResidentialBuildings
