import React from 'react'
import { ApolloProvider, gql, useSubscription, useMutation, useQuery } from '@apollo/client'
import { client } from '../sources/realtime'
// import { client2 } from '../sources/udtools'
import Blank from '../layouts/blank'
import Basic3D from '../components/basic3d'

// const MOVIES = gql`
//   query GetMovies {
//     getMovies(input: { movie: { genre: DRAMA, year: 2015 } }) {
//       result {
//         name
//         year
//         rating
//         cast
//         time {
//           seconds
//         }
//         genre
//       }
//     }
//   }
// `

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
  const { loading, error, data } = useSubscription(POINTS);
  // const { loading2, error2, movies } = useQuery(MOVIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // console.log(client2)
    
  return data.testpoints.sort((a, b) => ( a.id > b.id ))
  .map(({ id, status }) => (
    <Point key={id} id={id} status={status} />
  ))
}

export default () => (
  <Blank>
    <div className='fixed top-0 left-0 z-0 w-full h-full'>
      <Basic3D />
    </div>
    <div className='w-full h-full z-10 pointer-events-none'>
      <Points />
    </div>
  </Blank>
)
