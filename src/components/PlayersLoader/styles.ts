import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 10px;
  min-width: 100px;
  & > Button {
    margin-top: 50px;
  }
`
export const Table = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
export const TableItem = styled.li.attrs((props: { opacity: any }) => {})`
  opacity: ${props => (props.opacity ? 0.5 : 1)};
  cursor: pointer;
  position: relative;
  padding: 8px 8px 8px 40px;
  font-size: ${props => (props.opacity ? '32px' : '18px')};
  text-align: ${props => (props.opacity ? 'center' : '')};
  transition: 0.2s;
  align-self: flex-start;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:nth-child(even) {
    background: #391652;
  }
  &:nth-child(odd) {
    background: #5227a6;
  }
  &:hover {
    background: #222222; // <Thing> when hovered
  }
`
export const DeleteButton = styled.span.attrs(
  (props: { key: number; name: string }) => ({
    name: props.name,
  })
)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 16px 10px 16px;
  content: \u00D7;
  &:hover {
    background-color: #f44336;
    color: white;
  }
`
