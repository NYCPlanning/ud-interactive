import React, {Suspense} from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { AxesHelper } from 'three'
import { Billboard, Html } from '@react-three/drei'

export default ({ labels }) => {
 if (!labels) return null

 console.log(labels)

 const labelsRendered =  Object.entries(labels).map(([k,v], i) => {
   console.log(k)
   console.log(v)
  return (
    <Html
      key={i} 
      position={v}
    >
      <span className='model-label'>{k}</span>
    </Html>
  )
})

  console.log(labelsRendered)
  return (
    <Suspense>
      {labelsRendered}
    </Suspense>
  )
}