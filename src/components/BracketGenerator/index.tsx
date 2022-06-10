import React, {
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
  useState,
  useCallback,
} from 'react'

import { Container, Half, Layout } from './styles'

import { Button } from '../Button'
import { PlayersLoader } from '../PlayersLoader'
import { BracketBox } from '../BracketBox'
import { BracketDisplayer } from '../BracketDisplayer'

interface Bracket {
  lastGames: Array<number> | null
  nextGame: number | null
  teamnames: Array<string>
  bracketNo: number
  roundNo: number
  bye: boolean
}
let round = 1,
  closest: number,
  byes: number,
  brackets: Array<Bracket> = [],
  base: number,
  baseT: number,
  baseC: number,
  teamMark: number,
  nextInc: number,
  startingRound = round,
  last: Array<{ game: number; teams: any }>
export function BracketGenerator(props: any) {
  const knownBrackets = [2, 4, 8, 16, 32, 64, 128] // brackets with "perfect" proportions (full fields, no byes)
  const [, updateState] = useState({})
  const forceUpdate = useCallback(() => updateState({}), [])
  function setUpVariables(bases: number) {
    base = bases
    closest = knownBrackets.find(function (k) {
      return k >= base
    })!
    byes = closest - base
    round = 1
    if (byes > 0) base = closest
    ;(brackets = []),
      (baseT = base / 2),
      (baseC = base / 2),
      (teamMark = 0),
      (nextInc = base / 2)
  }

  let [players, setPlayers] = useState<Array<string>>([])

  let bracketCount = 0

  function getBracket() {
    startingRound = round
    for (let i = 1 + brackets.length; i <= base - 1; i++) {
      var baseR = i / baseT,
        isBye = false

      if (byes > 0 && (i % 2 != 0 || byes >= baseT - i)) {
        isBye = true
        byes--
      }

      last = brackets
        .filter(b => {
          return b.nextGame == i
        })
        .map(b => {
          return { game: b.bracketNo, teams: b.teamnames }
        })
      brackets.push({
        lastGames: round == 1 ? null : [last[0].game, last[1].game],
        nextGame: nextInc + i > base - 1 ? null : nextInc + i,
        teamnames:
          round == 1
            ? [players[teamMark], players[teamMark + 1]]
            : [
                last[0].teams[Math.floor(Math.random() * 2)],
                last[1].teams[Math.floor(Math.random() * 2)],
              ],
        bracketNo: i,
        roundNo: round,
        bye: isBye,
      })
      teamMark += 2
      if (i % 2 != 0) nextInc--
      while (baseR >= 1) {
        round++
        baseC /= 2
        baseT = baseT + baseC
        baseR = i / baseT
      }
      if (startingRound < round) {
        forceUpdate()
        break
      }
    }
    console.log(brackets)
    return brackets
  }

  return (
    <Layout>
      <PlayersLoader setPlayers={setPlayers} players={players}></PlayersLoader>
      <Half>
        <BracketDisplayer players={brackets}></BracketDisplayer>
        <Container>
          <Button
            onClick={() => {
              setUpVariables(players.length)
              brackets.length = 0
              getBracket()
            }}
          >
            Generate brackets
          </Button>
          <Button onClick={() => getBracket()}>Next round</Button>
        </Container>
      </Half>
    </Layout>
  )
}
