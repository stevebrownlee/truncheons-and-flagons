import { useScores } from "../ScoreProvider.js"
import { useTeams } from "../../team/TeamProvider.js"
import { usePlayers } from "../../player/PlayerProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".leaderboard")

applicationEventHub.addEventListener("teamStateChanged", event => {
    const scores = useScores()
    render(event.detail.teams, scores)
})

applicationEventHub.addEventListener("scoreStateChanged", event => {
    const teams = useTeams()
    render(teams, event.detail.scores)
})

applicationEventHub.addEventListener("playerStateChanged", event => {
    const scores = useScores()
    const teams = useTeams()
    render(teams, scores)
})

const render = (teamArray, teamScoreArray) => {
    const players = usePlayers()

    componentContainer.innerHTML = `
        <h3>Leaderboard</h3>
        ${
            teamArray.map(team => {
                const teamCumulativeScore = teamScoreArray
                    .filter(ts => ts.teamId === team.id)
                    .map(ts => {
                        const teamPlayers = players.filter(p => p.teamId === ts.teamId).length
                        team.players = teamPlayers
                        return ts
                    })
                    .reduce((c, n) => c + n.score, 0)

                return `<div>${team.moniker} (${team.players}): ${teamCumulativeScore}</div>`
            }).join("")
        }
    `
}

export const Leaderboard = () => {
    const scores = useScores()
    const teams = useTeams()
    render(teams, scores)
}