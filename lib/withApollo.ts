import ApolloClient from 'apollo-boost'
import getConfig from 'next/config'
import withApollo from 'next-with-apollo'

const { publicRuntimeConfig } = getConfig()
const { GRAPHQL_ENDPOINT } = publicRuntimeConfig

// Create HOC withApollo for injecting GraphQL data to pages.
export default withApollo(
  ({ ctx, headers }) => new ApolloClient({ uri: GRAPHQL_ENDPOINT })
)
