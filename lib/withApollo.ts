import ApolloClient from 'apollo-boost'
import getConfig from 'next/config'
import withApollo from 'next-with-apollo'

import { getToken } from '../utils'

const { publicRuntimeConfig } = getConfig()
const { GRAPHQL_ENDPOINT } = publicRuntimeConfig

// Create HOC withApollo for injecting GraphQL data to pages.
export default withApollo(({ ctx, headers }) => {
  return new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`
    }
  })
})
