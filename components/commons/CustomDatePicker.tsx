import * as React from 'react'
import DatePicker from 'react-datepicker'
import { Field } from 'react-final-form'
import moment from 'moment'

if (process.env.NODE_ENV !== 'test') {
  // Prevents Jest from trying to parse css.
  require('react-datepicker/dist/react-datepicker.css')
}

interface Props {
  label: string
  name: string
}

export const CustomDatePicker: React.SFC<Props> = ({ label, name }) => (
  <Field name={name}>
    {({ input }) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          {/* https://reactdatepicker.com/ */}
          <DatePicker
            {...input}
            dateFormat="MM/DD/YY, hh:mm a"
            // Get the user's locale from react-intl through props or use the util function
            // to provide here. Question: Will lang locale match with momentJS locale?
            locale="en-gb"
            selected={input.value ? moment(input.value) : null}
            showTimeSelect
            timeCaption="time"
            timeFormat="HH:mm"
            timeIntervals={15}
          />
        </div>
      )
    }}
  </Field>
)
