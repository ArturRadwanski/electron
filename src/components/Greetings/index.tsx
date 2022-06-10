import { Button } from '../Button'
import { Container, Image, Text } from './styles'
import { BracketGenerator } from '../BracketGenerator'

export function Greetings() {
  function handleSayHello() {
    let bracks: Array<Object> = []
    console.log(bracks)
  }

  function csvToArray(str: string, delimiter = ','): Array<string> {
    const array = str.split(delimiter)
    return array
  }

  function handleLoadFile() {}

  return (
    <Container>
      <BracketGenerator loadUsers={handleLoadFile}>
        Send message to main process
      </BracketGenerator>
    </Container>
  )
}
