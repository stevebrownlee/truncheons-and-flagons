import { useScores } from "../ScoreProvider.js"
import { useTeams } from "../../team/TeamProvider.js"

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

const render = (teamArray, scoreArray) => {
    componentContainer.innerHTML = `
        <h3>Leaderboard</h3>
        ${
            teamArray.map(team => {
                const teamCumulativeScore = scoreArray
                    .filter(s => s.teamId === team.id)
                    .reduce((c, n) => c + n.score, 0)

                return `<div>${team.moniker}: ${teamCumulativeScore}</div>`
            }).join("")
        }
    `
}

export const Leaderboard = () => {
    const scores = useScores()
    const teams = useTeams()
    render(teams, scores)
}