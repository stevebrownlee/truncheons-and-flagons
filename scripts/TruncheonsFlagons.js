import { PlayerForm } from "./player/PlayerForm.js"
import { TeamForm } from "./team/TeamForm.js"
import { Leaderboard } from "./scoretrackers/leaderboard/Leaderboard.js"
import { GamePlayersForm } from "./game/GamePlayersForm.js"
import { StartRound } from "./game/StartRound.js"
import { ScoreForm } from "./game/ScoreForm.js"
import { addScore } from "./scoretrackers/ScoreProvider.js"
import { GameScore } from "./scoretrackers/game/GameScores.js"


const applicationEventHub = document.querySelector(".container")
let currentRound = -1
let activeTeams = new Map()

const initializeTeams = () => {
    activeTeams.set("first", { teamId: 0, score: 0 })
    activeTeams.set("second", { teamId: 0, score: 0 })
    activeTeams.set("third", { teamId: 0, score: 0 })
}

applicationEventHub.addEventListener("gameStarted", e => {
    currentRound = 0
    render()
})

applicationEventHub.addEventListener("roundCompleted", e => {
    const scores = e.detail.scores

    for (const [team, score] of Object.entries(scores)) {
        const currentTeam = activeTeams.get(team)
        currentTeam.score += parseInt(score, 10)
    }

    currentRound++
    GameScore(activeTeams)
    render()
})

applicationEventHub.addEventListener("teamSelectedForGame", e => {
    const teamId = e.detail.teamId
    const cardinality = e.detail.cardinality

    const team = activeTeams.get(cardinality)
    team.teamId = parseInt(teamId, 10)

    const f = activeTeams.get("first").teamId
    const s = activeTeams.get("second").teamId
    const t = activeTeams.get("third").teamId

    if (
        (f == s || f == t || s == t) ||
        (f === 0 || s === 0 || t === 0)
    ) {
        currentRound = 0
    } else {
        currentRound = 1
        render()
    }
    GameScore(activeTeams)
})

const saveScores = () => {
    const timestamp = Date.now()

    for (const [key, teamScore] of activeTeams) {
        teamScore.timestamp = timestamp
        addScore(teamScore)
    }
}

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
            const first = activeTeams.get("first").teamId
            const second = activeTeams.get("second").teamId
            const third = activeTeams.get("third").teamId
            ScoreForm({ first, second, third, currentRound })
            break;
        case 4:
            currentRound = 0
            saveScores()
            initializeTeams()
            StartRound()
            break;
    }
}

export const TruncheonsFlagons = () => {
    initializeTeams()
    PlayerForm()
    TeamForm()
    Leaderboard()
    render()
}
