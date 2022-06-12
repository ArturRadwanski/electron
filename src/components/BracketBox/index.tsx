import react from 'react'
import { SingleTeam, Container } from './styles'

interface Bracket {
  lastGames: Array<number> | null
  nextGame: number | null
  teamnames: Array<string | undefined>
  bracketNo: number
  roundNo: number
  bye: boolean
  winner: number
}

export function BracketBox(props: {
  game: Bracket
  winnerIndex: number
  override: (round: number, oldWinner: string, newWinner: string) => void
}) {
  const [whichTeam, changeTeam] = react.useState<boolean>(!!props.game.winner)
  const [team1, team2] = props.game.teamnames
  let margin: number = 5 + 35 * (Math.pow(2, props.winnerIndex! - 1) - 1)
  return (
    <Container margin={margin}>
      <SingleTeam
        width="200px"
        team={team1}
        className={whichTeam ? '' : 'winner'}
      >
        {team1}{' '}
        <input
          type="checkbox"
          name="winner"
          checked={!whichTeam}
          onChange={() => {
            changeTeam(false)
            props.game.winner = 0
            props.override(props.winnerIndex, team2!, team1!)
          }}
        />
      </SingleTeam>
      <SingleTeam
        width="200px"
        team={team2}
        className={whichTeam ? 'winner' : ''}
      >
        {team2}{' '}
        <input
          type="checkbox"
          name="winner"
          checked={whichTeam}
          onChange={() => {
            changeTeam(true)
            props.game.winner = 1
            props.override(props.winnerIndex, team1!, team2!)
          }}
        />
      </SingleTeam>
    </Container>
  )
}
