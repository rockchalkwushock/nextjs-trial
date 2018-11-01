import * as React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { PortalWithState } from 'react-portal'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Router from 'next/router'

import { CustomDatePicker, CustomField } from '../commons'
import { MEETINGS_QUERY } from '../MeetingList'

export const CREATE_MEETING_MUTATION = gql`
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
      errors {
        field
        messages
      }
      data {
        id
        name
        description
      }
    }
  }
`

export class CreateMeeting extends React.Component {
  handleOnSubmit(fn: Function, fn2: Function) {
    fn() // submit form data
    fn2() // close the modal
    Router.push('/')
  }
  render() {
    return (
      <PortalWithState>
        {({ closePortal, openPortal, portal }) => (
          <React.Fragment>
            {openPortal()}
            {portal(
              <Mutation mutation={CREATE_MEETING_MUTATION}>
                {createMeeting => (
                  <Form
                    // // Todo: look at providing user data as initialValues for first attendee object.
                    // Todo: Figure out checkbox undefined value issue.
                    // Todo: Clean up code and document.
                    initialValues={{
                      attendees: [
                        // Can pass data.me down from Dashboard as props
                        // to populate these fields. Currently timezone
                        // doesn't exist on user object.
                        {
                          firstName: 'Cody',
                          lastName: 'Brunner',
                          email: 'rockchalkwushock@icloud.com',
                          timezone: 'America/Los_Angeles',
                          isHost: true
                        }
                      ]
                    }}
                    onSubmit={values => {
                      const formattedValues = {
                        ...values,
                        end: values.end.format(),
                        start: values.start.format()
                      }
                      createMeeting({
                        variables: { input: formattedValues },
                        refetchQueries: [{ query: MEETINGS_QUERY }]
                      })
                    }}
                    mutators={{ ...arrayMutators }}
                  >
                    {({ handleSubmit, mutators: { push, pop } }) => (
                      <form id="create-meeting-form">
                        <CustomField
                          label="Meeting Name"
                          name="name"
                          placeholder="Enter meeting name"
                          type="text"
                        />
                        <CustomField
                          label="Meeting Description"
                          name="description"
                          placeholder="Enter a description"
                          type="text"
                        />
                        <CustomDatePicker
                          name="start"
                          label="Meeting Start Time"
                        />
                        <CustomDatePicker name="end" label="Meeting End Time" />
                        <CustomField
                          label="Meeting Location"
                          name="location"
                          placeholder="Enter a location"
                          type="text"
                        />
                        <div className="buttons">
                          <button
                            type="button"
                            onClick={() => push('attendees', undefined)}
                          >
                            Add an Attendee
                          </button>
                          <button
                            type="button"
                            onClick={() => pop('attendees')}
                          >
                            Remove an Attendee
                          </button>
                        </div>
                        <FieldArray name="attendees">
                          {({ fields }) =>
                            fields.map((name, i) => (
                              <div key={name}>
                                <CustomField
                                  label="First Name"
                                  name={`${name}.firstName`}
                                  placeholder="Enter first name"
                                  type="text"
                                />
                                <CustomField
                                  label="Last Name"
                                  name={`${name}.lastName`}
                                  placeholder="Enter last name"
                                  type="text"
                                />
                                <CustomField
                                  label="Email"
                                  name={`${name}.email`}
                                  placeholder="Enter email"
                                  type="email"
                                />
                                <CustomField
                                  label="Timezone"
                                  name={`${name}.timezone`}
                                  placeholder="Enter your timezone"
                                  type="text"
                                />
                                <CustomField
                                  label="Hosting"
                                  name={`${name}.isHost`}
                                  type="checkbox"
                                />
                              </div>
                            ))
                          }
                        </FieldArray>
                        <button
                          onClick={() =>
                            this.handleOnSubmit(handleSubmit, closePortal)
                          }
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </Form>
                )}
              </Mutation>
            )}
          </React.Fragment>
        )}
      </PortalWithState>
    )
  }
}
