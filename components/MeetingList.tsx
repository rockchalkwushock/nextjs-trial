import * as React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

export const MEETINGS_QUERY = gql`
  query MEETINGS_QUERY {
    meetings: getMeetings {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`

export const MeetingList: React.SFC = () => (
  <Query query={MEETINGS_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <p>Error: {error.message}</p>
      if (loading) return <p>Loading...</p>
      return (
        <ul>
          {data.meetings.edges.map(({ node }) => (
            <li key={node.id}>{node.name}</li>
          ))}
        </ul>
      )
    }}
  </Query>
)
