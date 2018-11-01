import * as React from 'react'

import { CreateMeeting } from './CreateMeeting'

interface Props {
  action: string
}

export const Modal: React.SFC<Props> = ({ action }) => {
  switch (action) {
    case 'create':
      return <CreateMeeting />
    default:
      return <h1>404</h1>
  }
}
