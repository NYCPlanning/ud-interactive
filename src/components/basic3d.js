import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { gql, useMutation, useSubscription } from '@apollo/client'
import { client } from '../sources/realtime'

const POINTS = gql`
  subscription GetPoints {
    pts {
      geom
      id
      good
    }
  }
`

const CHANGE_POINT = gql`
  mutation UpdateStatus($id: Int!, $status: Boolean!) {
    update_pts_by_pk(
      pk_columns: {id: $id}, 
      _set: {
        good: $status
      }
    ) {
      good
    }
  }
`

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // change database in realtime using the mutation above
  const [ changePoint, { newPoint }] = useMutation(CHANGE_POINT, {client: client})

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  const handleClick = (e) => {
    setActive(!active)
    changePoint({ variables: { id: props.name,  status: !active }})
  }

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={handleClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Basic3D = () => {
  const { loading, error, data } = useSubscription(POINTS);
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const boxes = data.pts.map(({ geom: { coordinates: [x, y] }, good, id}) => (
    <Box key={id} name={id} position={[x, y, 0]} />
  ))

  return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes}
        {/* <Box name={2} position={[1.2, 0, 0]} /> */}
      </Canvas>
  )
}

export default Basic3D
