import React, { useEffect, useRef, Suspense, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { AxesHelper } from 'three';
import { proxy, useProxy} from 'valtio';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ContactShadows, Environment, Sky } from '@react-three/drei';

// DOM elements
// import Considerations from './considerations'
// import Draft from './draft'

// 3d scene elements
import Model2D from './digitaltwin/model2d'
import Model3D from './digitaltwin/model3d'
import SceneLabels from './digitaltwin/scenelabels'

// activate controls
extend({ OrbitControls });

// set z up
// THREE.Object3D.DefaultUp.set(0, 0, 1)

// state object
const state = proxy({
  sunParam: 0.5,
  autoRotate: false,
  currentScene: null,
  current: null,
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
      target={[0, 0, 0]}
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

  const light = useMemo(() => new THREE.DirectionalLight(0xfff9ab, 0.75), [])
  light.position.set( x, y, z )
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.height = 512
  light.shadow.camera.near = 50
  light.shadow.camera.far = 400
  light.shadow.camera.left = -300;
  light.shadow.camera.right = 300;
  light.shadow.camera.top = 300;
  light.shadow.camera.bottom = -300;
  light.shadow.radius = 0.1

  // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
  
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
    <group scale={[0.75,0.75,0.75]}>
      {/* <primitive object={cameraHelper} /> */}
      <primitive object={sunMesh} position={[ x, y, z ]} />
      <primitive object={light} />
      <primitive object={sunPathLine} />
    </group>
  )
}

// primary scene component
export default ({ buildings, fogStart }) => {
  const snap = useProxy(state);
  const [scene, setScene] = useState(0);

  const handleSliderChange = (e) => {
    e.preventDefault()
    state.sunParam = e.target.value
  }

  const handleSceneMouseOver = ( newScene ) => {
    setScene(newScene)
  }

  const [hovered, set] = useState(null)
  // useEffect(() => {
  //   const cursor = `
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165.09 57.43">
  //     <g id="Layer_2" data-name="Layer 2">
  //       <g id="Layer_1-2" data-name="Layer 1">
  //         <line x1="82.55" y1="23.75" x2="82.55" y2="57.43" fill="none" stroke="#231f20" stroke-miterlimit="10"/>
  //         <tspan x="35" y="63">
  //           ${hovered}
  //         </tspan>
  //       </g>
  //     </g>
  //   </svg>
  //   `
  //   const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
  //   document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  // }, [hovered])

  const labels = {
    'Bus Shelters': [299, 0, 83.77]
  }
  
  return (
      <div className='w-screen h-screen pointer-events-none overflow-y-hidden'>
          <div className='w-full h-full three-canvas pointer-events-auto'>
            <Canvas
              orthographic
              shadowMap
              shadowmap-type={THREE.VSMShadowMap}
              camera={{left: 10, right: -10, top: 10, bottom: -10, zoom: 2, position: [-400, 200, 200], near: 100, far: 800 }}
              antialias='true'
            >
              <Controls />
              <ambientLight intensity={0.50} />
              <Sun />
              <Suspense fallback={null}>
                <Model3D set={set} />
                <Model2D set={set} />
                <SceneLabels labels={labels} />
              </Suspense>
              <fog attach='fog' args={['#e4e3be', 400, 900]} />
            </Canvas>
      </div>
      
      <div className='fixed bottom-0 left-0 z-50 m-4 space-x-4 flex pointer-events-auto'>
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

    </div>
  );
}
