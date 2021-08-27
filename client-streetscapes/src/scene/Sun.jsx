import React from 'react'


const Sun = () => {
  return (
    <directionalLight
      position={[-200, 1000, 0]}
      intensity={0.66}
      color={0xfffaeb}
    />
  )
}

export default Sun
