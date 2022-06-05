import { render } from '@testing-library/react'
import { BracketGenerator } from './index'

test('tool to generate brackets', () => {
  const { getByText } = render(<BracketGenerator></BracketGenerator>)

  expect(getByText('ButtonContent')).toBeTruthy()
  expect(getByText('ButtonContent')).toHaveAttribute('type', 'button')
})
