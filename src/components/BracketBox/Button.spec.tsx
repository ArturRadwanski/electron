import { render } from '@testing-library/react'
import { BracketBox } from './index'

test('should be a single bracket', () => {
  const { getByText } = render(<BracketBox team1="team1" team2="team2" />)
})
