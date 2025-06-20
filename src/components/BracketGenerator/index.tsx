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
  teamnames: Array<string | undefined>
  bracketNo: number
  roundNo: number
  bye: boolean
  winner: number
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
  last: Array<{ game: number; winner: string }>

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

  const [players, setPlayers] = useState<Array<string>>([])
  let bracketCount = 0

  function getBracket() {
    startingRound = round
    let namesOfTheWinners = []
    for (let i = 1 + brackets.length; i <= base - 1; i++) {
      var baseR = i / baseT,
        isBye = false

      if (byes > 0 && (i % 2 != 0 || byes >= baseT - i)) {
        isBye = true
        byes--
      }
      namesOfTheWinners.push(teamMark)
      last = brackets
        .filter(b => {
          return b.nextGame == i
        })
        .map(b => {
          return { game: b.bracketNo, winner: b.teamnames[b.winner]! }
        })
      brackets.push({
        lastGames: round == 1 ? null : [last[0].game, last[1].game],
        nextGame: nextInc + i > base - 1 ? null : nextInc + i,
        teamnames:
          round == 1
            ? [players[teamMark], isBye ? undefined : players[teamMark + 1]]
            : [last[0].winner, last[1].winner],
        bracketNo: i,
        roundNo: round,
        bye: isBye,
        winner: 0,
      })
      teamMark += isBye ? 1 : 2
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
    return brackets
  }

  function saveResultsToFile() {
    let phasedBoxes: Array<Array<Bracket>> = []
    for (let i = 1; i > -1; i++) {
      let tab = brackets.filter(el => el.roundNo == i)
      if (tab.length == 0) break
      phasedBoxes.push(tab)
    }
    let string: string = 'data:text/plain,'
    phasedBoxes.map((el, i) => {
      let line: string = `round ${i + 1}:`
      el.map(game => {
        line += `(${game.teamnames[0]}${
          game.teamnames[1] == undefined ? '' : ', ' + game.teamnames[1]
        }) => ${game.teamnames[game.winner]}; `
      })
      line += '\n'
      string += line
    })
    window.Main.sendMessage(string)
  }

  return (
    <Layout>
      <PlayersLoader
        setPlayers={setPlayers}
        players={players}
        brackets={brackets}
        forceReload={forceUpdate}
      ></PlayersLoader>
      <Half>
        <BracketDisplayer
          players={brackets}
          forceUpdate={forceUpdate}
        ></BracketDisplayer>
        <Container>
          <Button
            onClick={() => {
              setUpVariables(players.length)
              brackets.length = 0
              let winners = getBracket()
            }}
          >
            Generate brackets
          </Button>
          <Button onClick={() => getBracket()}>Next round</Button>
          <Button onClick={saveResultsToFile}>Save results to file</Button>
        </Container>
      </Half>
    </Layout>
  )
}
