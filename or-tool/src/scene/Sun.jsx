import React from 'react'


const Sun = () => {
  return (
    <directionalLight
      position={[-200, 1000, 0]}
      intensity={1.0}
      color={0xfff8c7}
    />
  )
}

export default Sun
