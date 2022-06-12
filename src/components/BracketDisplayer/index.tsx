import * as react from 'react'
import { forEach } from '../../../webpack/rules.webpack'
import { BracketBox } from '../BracketBox'
import { Button } from '../Button'
import { BracketKeeper, Container } from './styles'

interface Bracket {
  lastGames: Array<number> | null
  nextGame: number | null
  teamnames: Array<string | undefined>
  bracketNo: number
  roundNo: number
  bye: boolean
  winner: number
}

export function BracketDisplayer(props: {
  players: Array<Bracket>
  forceUpdate: () => void
}) {
  function overrideTheWinner(
    round: number,
    oldWinner: string,
    newWinner: string
  ) {
    props.players.forEach(el => {
      if (el.roundNo > round && el.teamnames.includes(oldWinner))
        el.teamnames.splice(el.teamnames.indexOf(oldWinner), 1, newWinner)
    })
    props.forceUpdate()
  }

  let phasedBoxes: Array<Array<Bracket>> = []
  for (let i = 1; i > -1; i++) {
    let tab = props.players.filter(el => el.roundNo == i)
    if (tab.length == 0) break
    phasedBoxes.push(tab)
  }
  let displayBoxes = phasedBoxes.map((el, i) => {
    let tab = el.map((el, j) => {
      return (
        <BracketBox
          game={el}
          winnerIndex={i + 1}
          key={'a' + i + j}
          override={overrideTheWinner}
        />
      )
    })
    return (
      <Container key={'b' + i} round={i + 1}>
        {tab}
      </Container>
    )
  })
  return <BracketKeeper>{displayBoxes}</BracketKeeper>
}
