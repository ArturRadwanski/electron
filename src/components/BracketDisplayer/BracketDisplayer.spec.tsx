import { render } from '@testing-library/react'
import { BracketDisplayer } from './index'

test('should render brackets', () => {
  const { getByText } = render(<BracketDisplayer />)

  expect(getByText('ButtonContent')).toBeTruthy()
  expect(getByText('ButtonContent')).toHaveAttribute('type', 'button')
})
