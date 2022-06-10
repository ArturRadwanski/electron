import react from 'react'
import { SingleTeam } from './styles'

export function BracketBox(props: { team1: string; team2: string }) {
  const [whichTeam, changeTeam] = react.useState(true)
  return (
    <>
      <SingleTeam width="200px">
        {props.team1}{' '}
        <input
          type="checkbox"
          name="winner"
          checked={whichTeam}
          onChange={() => changeTeam(true)}
        />
      </SingleTeam>
      <SingleTeam width="200px" className="winner">
        {props.team2}{' '}
        <input
          type="checkbox"
          name="winner"
          checked={!whichTeam}
          onChange={() => changeTeam(false)}
        />
      </SingleTeam>
    </>
  )
}
