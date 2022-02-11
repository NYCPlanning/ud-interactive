import React from 'react'

import {
  BufferGeometryLoader,
  MeshStandardMaterial,
} from 'three'

const FromJSON = ({data, color=0xffffff, ...props}) => {
  if (data === undefined) return null

  const loader = new BufferGeometryLoader()
  const geom = loader.parse(data)
  const material = new MeshStandardMaterial({ 
    color: color,
    // wireframe: true,
  })

  return (
    <mesh {...props} geometry={geom} material={material} dispose={null} />
  )
}

export default FromJSON
