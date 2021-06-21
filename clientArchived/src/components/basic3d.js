import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { useGesture } from 'react-use-gesture'
import { useSpring, a } from '@react-spring/three'
import { gql, useMutation, useSubscription } from '@apollo/client'
import { client } from '../sources/realtime'

const POINTS = gql`
  subscription GetPoints {
    testpoints {
      geom
      id
      status
      name
    }
  }
`

const CHANGE_POINT = gql`
  mutation MyMutation($id: Int!, $status: Boolean!) {
    update_testpoints_by_pk(pk_columns: {id: $id}, 
      _set: {
        status: $status
      }
    ) {
      status
    }
  }
`

const Box = ({ position, ...props }) => {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [spring, api] = useSpring(() => ({
    position: position, 
    rotation: [0, 0, 0], 
    config: { friction: 10 } 
  }))

  // persist changed position using the mutation above
  // const [ changePoint, { newPoint }] = useMutation(CHANGE_POINT, {client: client})
  // const handleClick = (e) => {
  //   // setActive(!active)
  //   changePoint({ variables: { id: props.name,  status: !props.status }})
  // }

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => api.set({
      // position: [x / aspect, -y / aspect, 0], 
      // rotation: [y / aspect, x / aspect, 0] 
      position: [x/aspect, -y/aspect, 0]
    }),
    onDragEnd: ({xy, event}) => console.log(event.object.position)
  })

  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)

  const color = props.status ? 'hotpink' : 'orange'

  return (
    <a.mesh
      {...spring}
      {...bind()}
      // onClick={handleClick}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </a.mesh>
  )
}

const Basic3D = () => {
  const { loading, error, data } = useSubscription(POINTS);
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const boxes = data.testpoints.map(({ geom: { coordinates: [x, y] }, status, id}) => (
    <Box key={id} name={id} position={[x, y, 0]} status={status} />
  ))

  return (
      <Canvas >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes}
        {/* <Box name={2} position={[1.2, 0, 0]} /> */}
      </Canvas>
  )
}

export default Basic3D
