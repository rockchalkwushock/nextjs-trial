import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { addLocaleData, IntlProvider } from 'react-intl'

import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'

import { messages } from '../lang'
import withApollo from '../lib/withApollo'
import { getLocale } from '../utils'

addLocaleData([en, ru])
const locale = getLocale()

console.log(locale)
console.log(Intl.DateTimeFormat().resolvedOptions().locale)
class MyApp extends App {
  render() {
    const { Component, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Component {...this.props} />
          </IntlProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

// Wrap all pages with the Apollo HOC to inject data from
// GraphQL Endpoint.
export default withApollo(MyApp)
