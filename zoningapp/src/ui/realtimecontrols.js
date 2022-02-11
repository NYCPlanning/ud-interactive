import React from 'react'
import { gql, useSubscription, useMutation } from '@apollo/client'

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
  
function Point({id, status}) {
  const [ changePoint, { newPoint }] = useMutation(CHANGE_POINT)

  const handleClick = () => {
    console.log('clicked', id, status)
    changePoint({ variables: { id: id,  status: !status }})
    console.log(newPoint)
  }
  
  return (  
  <div>
    {id} {status ? 'OK' : ''}
    <button onClick={handleClick}>+</button>
  </div>
)
}

function Points() {
  const { loading, error, data } = useSubscription(POINTS)
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
    
  return data.testpoints.sort((a, b) => ( a.id > b.id ))
  .map(({ id, status }) => (
    <Point key={id} id={id} status={status} />
  ))
}

const RealtimeControls = () => (
  <div>
    <Points />
  </div>
)

export default RealtimeControls
