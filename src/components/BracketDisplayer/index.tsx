import * as react from 'react'
import { BracketBox } from '../BracketBox'

interface Bracket {
  lastGames: Array<number> | null
  nextGame: number | null
  teamnames: Array<string>
  bracketNo: number
  roundNo: number
  bye: boolean
}

export function BracketDisplayer(props: { players: Array<Bracket> }) {
  let allBoxes = props.players.map((el, i) => {
    return (
      <BracketBox team1={el.teamnames[0]} team2={el.teamnames[1]} key={i} />
    )
  })
  return <>{allBoxes}</>
}
