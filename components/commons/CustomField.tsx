import * as React from 'react'
import { Field } from 'react-final-form'

interface Props {
  label: string
  name: string
  placeholder?: string
  type: string
}

// Todo:
// 1. WARIA
// 2. Styled-Components
// 3. Test

export const CustomField: React.SFC<Props> = ({
  label,
  name,
  placeholder,
  type
}) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} id={name} placeholder={placeholder} type={type} />
        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    )}
  </Field>
)
