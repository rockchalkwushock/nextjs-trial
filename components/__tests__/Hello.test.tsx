import * as React from 'react'
import { render } from 'react-testing-library'

import { Hello } from '../Hello'

describe('<Hello />', () => {
  test('should render to DOM', () => {
    const { asFragment, container } = render(<Hello framework="NextJS" />)
    expect(container.textContent).toEqual('Hello from NextJS!')
    expect(asFragment()).toMatchSnapshot()
  })
})
