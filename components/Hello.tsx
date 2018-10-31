import * as React from 'react'
import styled from 'styled-components'

interface Props {
  framework: string
}

const Title = styled.h1`
  font-size: 2rem;
  color: magenta;
`

export const Hello: React.SFC<Props> = ({ framework }) => (
  <Title>Hello from {framework}!</Title>
)
