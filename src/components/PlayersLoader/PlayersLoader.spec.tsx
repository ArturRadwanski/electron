import { render } from '@testing-library/react'
import { PlayersLoader } from './index'

test('tool to load and display Players', () => {
  const { getByText } = render(<PlayersLoader />)

  expect(getByText('ButtonContent')).toBeTruthy()
  expect(getByText('ButtonContent')).toHaveAttribute('type', 'button')
})
