import { render } from '@testing-library/react'
import React from 'react'

import { App } from '../src/app'

describe('ui-react-basic', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders', () => {
    render(<App />)
  })
})
