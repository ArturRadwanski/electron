import styled from 'styled-components'

export const SingleTeam = styled.div.attrs(
  (props: { width: number | string }) => {
    width: props.width || '10%'
  }
)`
  width: ${props => props.width};
  background: #8257e6;
  height: 40px;
  text-align: center;
  padding: 10px 0;
  &.winner {
    background: #9368f7;
  }
`
