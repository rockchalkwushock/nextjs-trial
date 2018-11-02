import * as React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const Title = styled.h1`
  font-size: 2rem;
  color: magenta;
`

export const Hello: React.SFC = () => (
  <Title>
    <FormattedMessage id="greeting" defaultMessage="Hello from NextJS" />
  </Title>
)
