import { PlayerForm } from "./player/PlayerForm.js"
import { TeamForm } from "./team/TeamForm.js"
import { Leaderboard } from "./scoretrackers/leaderboard/Leaderboard.js"


const applicationEventHub = document.querySelector(".container")

let currentRound = 1
let activeTeams = new Map()
activeTeams.set("first", {id: 0, score: 0})
activeTeams.set("second", {id: 0, score: 0})
activeTeams.set("third", {id: 0, score: 0})

applicationEventHub.addEventListener("roundCompleted", e => {
    const scores = e.detail.scores

    for (const teamScore of Object.defineProperties(scores)) {
        const team = activeTeams.get(teamScore.key)
        team.score += teamScore.value
    }
})

applicationEventHub.addEventListener("teamSelectedForGame", e => {
    const teamId = e.detail.teamId
    const cardinality = e.detail.cardinality

    const team = activeTeams.get(cardinality)
    team.id = teamId
})

export const TruncheonsFlagons = () => {
    PlayerForm()
    TeamForm()
    Leaderboard()
}