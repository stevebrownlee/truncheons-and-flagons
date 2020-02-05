import { useScores } from "../ScoreProvider.js"
import { useTeams } from "../../team/TeamProvider.js"
import { usePlayers } from "../../player/PlayerProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".leaderboard")

applicationEventHub.addEventListener("teamSelectedForGame", event => {
    const teamEl = document.querySelector(`.team--${event.detail.teamId}`)
    teamEl.classList.add("highlight")
})

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
        <div className="teams">
            <div class="team team__header">
                <div class="team__columnHeader team__name">Name</div>
                <div class="team__columnHeader team__playerCount">Players</div>
                <div class="team__columnHeader team__score">Score</div>
            </div>

        ${
        teamArray.map(team => {
            team.players = players.filter(p => p.teamId === team.id).length

            team.cumulativeScore = teamScoreArray
                .filter(ts => ts.teamId === team.id)
                .reduce((c, n) => c + n.score, 0)
            return team
        })
            .sort((c, n) => n.cumulativeScore - c.cumulativeScore)
            .map(team => {
                return `
                <div class="team team--${team.id} ${team.players < 3 ? "inactive" : "active" }">
                    <div class="team__column team__name">${team.moniker}</div>
                    <div class="team__column team__playerCount">${team.players || 0}</div>
                    <div class="team__column team__score">${team.cumulativeScore || 0}</div>
                </div>
            `
            })
            .join("")
        }
        </div>
    `
}

export const Leaderboard = () => {
    const scores = useScores()
    const teams = useTeams()
    render(teams, scores)
}