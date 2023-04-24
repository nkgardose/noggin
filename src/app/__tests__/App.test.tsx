import { render } from '@testing-library/react'
import App from '..'

describe('App', () => {
  it('renders properly', () => {
    const { container } = render(<App />)

    expect(container).toMatchSnapshot()
  })
})
