import React from 'react'
import { ApolloProvider, gql, useSubscription, useMutation } from '@apollo/client'
import { client } from '../sources/realtime'
import Blank from '../layouts/blank'


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
  
  function Point({id, status}) {
    const [ changePoint, { newPoint }] = useMutation(CHANGE_POINT)
    
    const handleClick = () => {
      changePoint({ variables: { id: id,  status: !status }})
    }
    
    return (  
      <div>
      {id} {status ? 'OK' : ''}
      <button onClick={handleClick}>+</button>
    </div>
  )
}

function Points() {
  const { loading, error, data } = useSubscription(POINTS);
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
    
  return data.pts.sort((a, b) => ( a.id > b.id ))
  .map(({ id, good }) => (
    <Point key={id} id={id} status={good} />
  ))
}

export default () => (
  <ApolloProvider client={client}>
    <Blank>
      REALTIME TEST
      <Points />
    </Blank>
  </ApolloProvider >
)