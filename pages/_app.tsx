import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'

class MyApp extends App {
  render() {
    // pageProps & apollo made available via withApollo()
    const { Component, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...this.props} />
        </ApolloProvider>
      </Container>
    )
  }
}

// Wrap all pages with the Apollo HOC to inject data from
// GraphQL Endpoint.
export default withApollo(MyApp)
