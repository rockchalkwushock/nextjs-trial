import * as React from 'react'

interface Props {
  framework: string
}

export const Hello: React.SFC<Props> = ({ framework }) => (
  <h1>Hello from {framework}!</h1>
)
