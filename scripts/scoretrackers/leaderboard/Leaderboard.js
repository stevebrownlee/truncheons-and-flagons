import { useScores } from "../ScoreProvider.js"
import { useTeams } from "../../team/TeamProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".leaderboard")

eventHub.addEventListener("teamStateChanged", event => {
    const scores = useScores()
    render(event.detail.teams, scores)
})

const render = (teamArray, scoreArray) => {
    contentTarget.innerHTML = `
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