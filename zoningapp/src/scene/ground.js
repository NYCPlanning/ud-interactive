import React, {
  useState,
  useEffect,
  useRef,
} from 'react'
import {
  BufferGeometryLoader,
  MeshStandardMaterial,
  sRGBEncoding,
  DoubleSide,
  Texture,
  BufferAttribute,
  Vector2,
  // Vector3,
  Raycaster,
  // Mesh,
} from 'three'

// import { useGesture } from '@use-gesture/react'
// import { TransformControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'

import {
  getGroundTexture,
  groundSurfaceRequest,
  groundTextureRequest,
  makeGroundSurface,
} from '../services/grpc'

import Box from './box'

const loader = new BufferGeometryLoader()
// const worldZ = new Vector3(0.0, 0.0, 1.0)
let raycaster = new Raycaster()

const scaleValue = (value, [inMin, inMax], [outMin, outMax]) => {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

const Ground = ({bounds, applyTexture, ...props}) => {
  const [pointer, setPointer] = useState([0, 0])
  const [texture, setTexture] = useState()
  const [ground, setGround] = useState()
  const [geom, setGeom] = useState()
  const [material, setMaterial] = useState()

  const {spring} = useSpring({spring: [100, 25, 0]})

  const { camera } = useThree()

  // usegesture
  // const [bPosition, setBPosition] = useState([100, 25, 0])
  // const [initPosition, setInitPosition] = useState([100, 25])
  // const arg = false
  // const bind = useGesture(
  //   {
  //     // onMove: ({ xy }) => setPointer(xy),
  //     onDragStart: () => setInitPosition([bPosition[0], bPosition[1]]),
  //     onDrag: ({ offset: [x, y]}) => {
  //       // todo - transform screen space xy offset to world space
  //       const newPosition = [initPosition[1] + x, initPosition[0] + y, 0]
  //       console.log(initPosition)
  //       console.log(newPosition)
  //       setBPosition(newPosition)
  //     },
  //     onDragEnd: () => console.log('done dragging')
  // })

  const meshRef = useRef()

  // rpc requests from bounds
  const groundRequest = groundSurfaceRequest({geom: bounds})
  const texRequest = groundTextureRequest({geom: bounds})

  // get mouse position from three
  useFrame(({mouse}) => {
    // in normalized device coordinates
    const x = mouse.x
    const y = mouse.y
    setPointer([x, y])
  })

  // fetch ground
  useEffect(() => {
    makeGroundSurface({request: groundRequest}).then((geom) => setGround(geom))
  }, [])

  // load as three BufferGeometry
  useEffect(() => {
    if (ground) setGeom(loader.parse(ground))
    // setGeom(new PlaneGeometry(100, 100))
  }, [ground])

  // fetch ground texture
  useEffect(() => {
    if (applyTexture) getGroundTexture({request: texRequest}).then((tex) => setTexture(tex))
  }, [])

  // make material with ground texture
  useEffect(() => {
    if (geom && (!applyTexture || texture)) {
      // && (!applyTexture || texture

      // compute planar texture mapping
      geom.computeBoundingBox()
      const {
        min: {x: xmin, y: ymin},
        max: {x: xmax, y: ymax}
      } = geom.boundingBox

      let uvs = []
      const positions = geom.attributes.position.array

      for (var i = 0; i < positions.length; i += 3) {
        const u = scaleValue(positions[i], [xmin, xmax], [0, 1])
        const v = scaleValue(positions[i+1], [ymin, ymax], [0, 1])
        const uv = [u, v]
        uvs.push(...uv)
      }

      var uvs32 = new Float32Array(uvs)
      geom.setAttribute( 'uv', new BufferAttribute( uvs32, 2 ) )
      geom.attributes.uv.needsUpdate = true

      const tex = new Texture()
      tex.image = texture
      tex.encoding = sRGBEncoding
      tex.needsUpdate = true

      const mat = new MeshStandardMaterial({color: 0x696969, side: DoubleSide, tex})
      if (applyTexture) mat.map = tex

      setMaterial(mat)
    }
  }, [ground, geom, texture])

  // RAYCASTING EXAMPLE 1, UPDATE BOX Z COORDINATE TO PROJECTED POINT ON GROUND MESH
  // useEffect(() => {
  //   if (meshRef.current && material) {
  //     const origin = new Vector3(...bPosition)
  //     const raycaster = new Raycaster(origin, worldZ, 1.0, 150.0)
  //     const groundPlane = meshRef.current
  //     const intersects = raycaster.intersectObject(groundPlane, true)
  //     if (intersects.length > 0) {
  //       const castPoint = intersects[0].point
  //       setBPosition([castPoint.x, castPoint.y, castPoint.z])
  //     }
  //   }
  // }, [meshRef.current, material, bPosition])

  // RAYCASTING EXAMPLE 2, USE CAMERA TO RAYCAST CURSOR POSITION ONTO PLANE
  useEffect(() => {
    if (meshRef.current) {
      const p = new Vector2(pointer[0], pointer[1])
      raycaster.setFromCamera(p, camera)
      const intersects = raycaster.intersectObject(meshRef.current)
      if (intersects.length > 0) {
        const pt = intersects[0].point
        spring.start([pt.x, pt.y, pt.z])
      }
    }
  }, [pointer])

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        geometry={geom}
        material={material}
        dispose={null}
      />
      <a.group position={spring}>
        <Box
          scale={[20, 20, 20]}
        />
      </a.group>
    </>
  )
}

export default Ground

// {...bind(arg)}

// <TransformControls
//   mode={'translate'}
//   // showX={showX}
//   // showY={showY}
//   showZ={false}
//   position={bPosition}
// >
// </TransformControls>
