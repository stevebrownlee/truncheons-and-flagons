import { PlayerForm } from "./player/PlayerForm.js"
import { TeamForm } from "./team/TeamForm.js"
import { Leaderboard } from "./scoretrackers/leaderboard/Leaderboard.js"
import { GamePlayersForm } from "./game/GamePlayersForm.js"
import { StartRound } from "./game/StartRound.js"
import { ScoreForm } from "./game/ScoreForm.js"


const applicationEventHub = document.querySelector(".container")

let currentRound = -1

let activeTeams = new Map()
activeTeams.set("first", {id: 0, score: 0})
activeTeams.set("second", {id: 0, score: 0})
activeTeams.set("third", {id: 0, score: 0})

applicationEventHub.addEventListener("gameStarted", e => {
    currentRound = 0
    render()
})

applicationEventHub.addEventListener("roundCompleted", e => {
    const scores = e.detail.scores
    debugger
    for (const teamScore of Object.entries(scores)) {
        const team = activeTeams.get(teamScore.key)
        team.score += teamScore.value
    }

    currentRound++
})

applicationEventHub.addEventListener("teamSelectedForGame", e => {
    const teamId = e.detail.teamId
    const cardinality = e.detail.cardinality

    const team = activeTeams.get(cardinality)
    team.id = parseInt(teamId, 10)

    const f = activeTeams.get("first").id
    const s = activeTeams.get("second").id
    const t = activeTeams.get("third").id

    if (
        (f == s || f == t || s == t)
        || (f === 0 || s === 0 || t === 0)
    ) {
        currentRound = 0
    } else {
        currentRound = 1
        render()
    }
})

const render = () => {
    switch (currentRound) {
        case -1:
            StartRound()
            break;
        case 0:
            GamePlayersForm()
            break;
        case 1:
        case 2:
        case 3:
            const first = activeTeams.get("first").id
            const second = activeTeams.get("second").id
            const third = activeTeams.get("third").id

            ScoreForm({ first, second, third, currentRound })
            break;
        case 4:
            currentRound = 0
            break;
    }
}

export const TruncheonsFlagons = () => {
    PlayerForm()
    TeamForm()
    Leaderboard()
    render()
}
