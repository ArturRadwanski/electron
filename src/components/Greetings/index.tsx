import { Button } from '../Button'
import { Container, Image, Text } from './styles'

export function Greetings() {
  let round = 1
  function handleSayHello() {
    let bracks = getBracket(7)
    console.log(bracks)
  }
  function handleLoadFile(): void {
    let fileContainer = document.createElement('input')
    fileContainer.setAttribute('type', 'file')
    fileContainer.setAttribute('accept', '.csv')
    fileContainer.click()
    fileContainer.onchange = () => {
      let file: File = fileContainer.files![0]
      if (!file.name.endsWith('csv')) {
        return
      }
    }
  }
  const knownBrackets = [2, 4, 8, 16, 32, 64, 128] // brackets with "perfect" proportions (full fields, no byes)

  const exampleTeams = [
    'New Jersey Devils',
    'New York Islanders',
    'New York Rangers',
    'Philadelphia Flyers',
    'Pittsburgh Penguins',
    'Boston Bruins',
    'Buffalo Sabres',
    'Montreal Canadiens',
    'Ottawa Senators',
    'Toronto Maple Leafs',
    'Carolina Hurricanes',
    'Florida Panthers',
    'Tampa Bay Lightning',
    'Washington Capitals',
    'Winnipeg Jets',
    'Chicago Blackhawks',
    'Columbus Blue Jackets',
    'Detroit Red Wings',
    'Nashville Predators',
    'St. Louis Blues',
    'Calgary Flames',
    'Colorado Avalanche',
    'Edmonton Oilers',
    'Minnesota Wild',
    'Vancouver Canucks',
    'Anaheim Ducks',
    'Dallas Stars',
    'Los Angeles Kings',
    'Phoenix Coyotes',
    'San Jose Sharks',
    'Montreal Wanderers',
    'Quebec Nordiques',
    'Hartford Whalers',
  ] // because a bracket needs some teams!

  let bracketCount = 0

  function getBracket(base: number) {
    let startingRound = round
    let closest: number = knownBrackets.find(function (k) {
      return k >= base
    })!
    let byes: number = closest - base

    if (byes > 0) base = closest

    let brackets = [],
      baseT = base / 2,
      baseC = base / 2,
      teamMark = 0,
      nextInc = base / 2

    for (let i = 1; i <= base - 1; i++) {
      var baseR = i / baseT,
        isBye = false

      if (byes > 0 && (i % 2 != 0 || byes >= baseT - i)) {
        isBye = true
        byes--
      }

      var last: Array<{ game: number; teams: any }> = brackets
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
            ? [exampleTeams[teamMark], exampleTeams[teamMark + 1]]
            : [
                last[0].teams[Math.floor(Math.random() * 10)],
                last[1].teams[Math.floor(Math.random() * 10)],
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
      if (startingRound < round) break
    }
    return brackets
  }

  return (
    <Container>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <Text>
        An Electron boilerplate including TypeScript, React, Jest and ESLint.
      </Text>
      <Button onClick={handleSayHello}>Send message to main process</Button>
    </Container>
  )
}
