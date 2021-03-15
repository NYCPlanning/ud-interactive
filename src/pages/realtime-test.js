import React from 'react'
// import { ApolloProvider, gql, useSubscription, useMutation, useQuery } from '@apollo/client'
// import { client } from '../sources/realtime'
// import { client2 } from '../sources/udtools'
// import Blank from '../layouts/blank'
// import Basic3D from '../components/basic3d'

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

// const POINTS = gql`
//   subscription GetPoints {
//     pts {
//       geom
//       id
//       good
//     }
//   }
// `

// const CHANGE_POINT = gql`
//   mutation UpdateStatus($id: Int!, $status: Boolean!) {
//     update_pts_by_pk(
//       pk_columns: {id: $id}, 
//       _set: {
//         good: $status
//       }
//     ) {
//       good
//     }
//   }
// `
  
//   function Point({id, status}) {
//     const [ changePoint, { newPoint }] = useMutation(CHANGE_POINT)


//     const handleClick = () => {
//       changePoint({ variables: { id: id,  status: !status }})
//     }
    
//     return (  
//       <div>
//       {id} {status ? 'OK' : ''}
//       <button onClick={handleClick}>+</button>
//     </div>
//   )
// }

// function Points() {
//   const { loading, error, data } = useSubscription(POINTS);
//   const { loading2, error2, movies } = useQuery(MOVIES)

  
//   if (loading || loading2) return <p>Loading...</p>
//   if (error || error2) return <p>Error :(</p>

//   console.log(client2)
//   console.log(movies)
    
//   return data.pts.sort((a, b) => ( a.id > b.id ))
//   .map(({ id, good }) => (
//     <Point key={id} id={id} status={good} />
//   ))
// }

// export default () => (
//   <Blank>
//     <div className='fixed top-0 left-0 z-0 w-full h-full'>
//       <Basic3D />
//     </div>
//     <div className='w-full h-full z-10 pointer-events-none'>
//       REALTIME TEST
//       <Points />
//     </div>
//   </Blank>
// )

export default () => (
  <span>empty</span>
)