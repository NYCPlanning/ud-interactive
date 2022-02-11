import React from 'react'

const Box = ({ ...props }) => {
  const color = props.status ? 'hotpink' : 'orange'

  return (
    <mesh {...props} >
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default Box