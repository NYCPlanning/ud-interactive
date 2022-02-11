import React, { useState } from 'react'
import { useHover } from '@use-gesture/react'
import { Html } from '@react-three/drei' // Text

import {
  LineBasicMaterial,
  BufferGeometryLoader,
} from 'three'

const Line = ({data, color=0x0000ff, ...props}) => {
  const [hover, setHover] = useState(false)

  //use-gesture stuff
  const config = {}
  const arg = false
  const bind = useHover((state) => setHover(!hover), config)

  if (data === undefined) return null

  const loader = new BufferGeometryLoader()
  const geom = loader.parse(data)
  const material = new LineBasicMaterial({ color: color })

  let annotation = null
  if (hover) {
    //annotation = <Text color='blue' scale={[300, 300, 300]}>front lot line</Text>
    annotation = <Html><p>lot line</p></Html>
  }

  return (
    <>
      <line
        {...bind(arg)}
        {...props}
        geometry={geom}
        material={material}
        dispose={null}
      />
      { annotation }
    </>
  )
}

export default Line
