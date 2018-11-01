import * as React from 'react'
import Router from 'next/router'

import { Hello, MeetingList, Modal } from '../components'

export default class extends React.Component {
  showModal(e: React.SyntheticEvent, action: string) {
    e.preventDefault()
    Router.push(`/?action=${action}`, `/?action=${action}`, {
      shallow: true
    })
  }
  render() {
    return (
      <div>
        {this.props.router.query.action && (
          <Modal action={this.props.router.query.action} />
        )}
        <Hello framework="NextJS" />
        <MeetingList />
        <a href="/?action=create" onClick={e => this.showModal(e, 'create')}>
          Create Meeting
        </a>
      </div>
    )
  }
}
