import styled from 'styled-components'

export const Container = styled.div.attrs((props: { round: number }) => {})`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: calc(100% * ${props => props.round! + 1});
  align-self: stretch;
  margin-left: 0 10px;
  min-width: 0;
`
export const BracketKeeper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0 10px;
  gap: 10px;
  min-width: 0;
  overflow-x: auto;
`
