// this one isn't changing anything, just drawing the positions of points in the model so you can see them change

import React from 'react'
import { gql, useSubscription } from '@apollo/client'

import { client } from '../services/graphql'
import Box from './box'

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

const RealtimePoints = () => {
  const { loading, error, data } = useSubscription(POINTS, {'client': client})

  if (loading) return null
  if (error) return null

  const points = data.testpoints.map(({ geom: { coordinates: [x, y] }, status, id}) => (
    <Box 
      key={id}
      name={id}
      position={[x, y, 0]}
      scale={[10, 10, 10]}
      status={status}
    />
  ))
  
  return (
    <group position={[0, 0, 0]} >
      {points}
    </group>
  )
}

export default RealtimePoints
