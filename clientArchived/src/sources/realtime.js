import { 
  ApolloClient, 
  ApolloProvider,
  createHttpLink,
  gql, 
  InMemoryCache,
  useQuery,
  split,
  useSubscription,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { isCompositeType } from 'graphql'
// import { split } from 'apollo-link'

// don't do this in production!
const httpLink = createHttpLink({
  uri: `http://${process.env.GRAPHQL_ENDPOINT}`,
  headers: {
      'x-hasura-admin-secret': process.env.GRAPHQL_SECRET,
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': process.env.GRAPHQL_SECRET,
      }
    }
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

export { client }