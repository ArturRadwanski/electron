import styled from 'styled-components'

export const SingleTeam = styled.div.attrs(
  (props: {
    width: number | string
    team: string | null
    opacity?: number
  }) => {
    props.width = props.width || '10%'
    props.opacity = props.team == null ? 0.01 : 1
  }
)`
  width: ${props => props.width};
  background: #8257e6;
  height: 30px;
  text-align: center;
  padding: 5px 0;
  opacity: ${props => props.opacity};
  &.winner {
    background: #9368f7;
  }
`
export const Container = styled.div.attrs((props: { margin: number }) => {})`
  margin: ${props => props.margin}px 0;
`
