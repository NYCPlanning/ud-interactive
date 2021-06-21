import React from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { AxesHelper } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import model2d from './model2d.fbx'

import { magenta, darkblue, lightgreen } from '../scene-colors'

// use fbx for curves
// in rhino, use "Map Rhino Z to FBX Y"
export default ({set}) => {
  const fbx = useLoader(FBXLoader, model2d)

  const defaultMaterial = new THREE.LineBasicMaterial({ color: 0xacacac})

  const materials = {
    'Default': new THREE.LineDashedMaterial({ 
      color: magenta,
      scale: 0.25,
      dashSize: 6,
      gapSize: 3
    }),
    'taxlot': new THREE.LineBasicMaterial({ color: magenta}),
    'transit': new THREE.LineBasicMaterial({ color: darkblue}),
    'roadbed': new THREE.LineDashedMaterial({ color: 0xe1e1e1}),
    'streettree': new THREE.LineBasicMaterial({ color: lightgreen})
  }

  fbx.traverse((child) => {
    if (child instanceof THREE.Line) {
      if (child.parent) {
        child.material = materials[child.parent.name] || defaultMaterial
      } else {
        child.material = defaultMaterial
      }

      if (child.parent && child.parent.name === 'taxlot') {
        child.position.y = 5
      }

      child.computeLineDistances()
    }
  })

  const handleMouseOver = (e) => {
    // layer
    if (e.object.parent) {
      const p = e.object.parent
      set(p.name)
    }
  }

  return (
    <>
      <primitive 
        object={fbx} 
        scale={[0.3048, 0.3048, 0.3048]}
        position={[0,-50,0]}
        dispose={null}
        onPointerOver={handleMouseOver}
      />
      {/* <axesHelper position={[-200,-50,-200]} scale={[15,15,15]}/> */}
    </>
  )
}