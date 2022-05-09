import { split, HttpLink, ApolloClient } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: process.env.BACKEND_HTTP || "http://localhost:3000/query"
})

const wsLink = new WebSocketLink({
  uri: process.env.BACKEND_WS || "ws://localhost:3000/query",
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
export default client