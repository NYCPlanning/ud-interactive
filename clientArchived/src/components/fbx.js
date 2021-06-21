// use fbx for curves
// in rhino, use "Map Rhino Z to FBX Y"
// function FromFBX({ wireframe }) {
//   const fbxGeom = useLoader(FBXLoader, sunpathFbx);
//   const wfMaterial = new THREE.LineBasicMaterial({ color: 0x26371a})
//   // const wfMaterial = new THREE.LineDashedMaterial({ color: 0x000000, dashSize: 0.25, gapSize: 0.25 });


//   console.log(fbxGeom)
//   // fbxGeom.children[0].children.forEach((l) => {
//   //   l.material = wfMaterial
//   //   l.computeLineDistances();
//   // })
//   return 
//   <>
//     <primitive object={fbxGeom} dispose={null}/>
//     <axesHelper position={ptOnCurve} scale={[10,10,10]}/>
//   </>
// }