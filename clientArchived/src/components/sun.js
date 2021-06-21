import React, { useMemo } from 'react'
import * as THREE from 'three'

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

export default ({ param }) => {
  // const snap = useProxy(state);
  const sunColor = 0xe9d900;
  const curvePts = testPts.map((pt) => new THREE.Vector3( ...pt ));
  const sunPath = new THREE.CatmullRomCurve3(curvePts);
  const p = sunPath.getPoint(param);
  const { x, y, z } = p;

  const light = useMemo(() => new THREE.DirectionalLight({
    color: 0xffffff, 
    intensity: 1.0,
  }), [])

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
    color: 0xffffff,
    linewidth: 10,
    // scale: 12,
    dashSize: 10,
    gapSize: 10,
  });
  const sunPathDrawPts = sunPath.getPoints(12);
  const sunPathGeom = new THREE.BufferGeometry().setFromPoints( sunPathDrawPts );
  const sunPathLine = new THREE.Line(sunPathGeom, sunPathMaterial);
  sunPathLine.computeLineDistances();

  const sunGeom = new THREE.SphereGeometry(10, 12, 12)
  const sunMaterial = new THREE.MeshBasicMaterial( {color: sunColor})
  const sunMesh = new THREE.Mesh( sunGeom, sunMaterial )

  return (
    <>
      {/* <primitive object={cameraHelper} /> */}
      <primitive object={sunMesh} position={[ x, y, z ]} />
      <primitive object={light} />
      <primitive object={sunPathLine} />
    </>
  )
}