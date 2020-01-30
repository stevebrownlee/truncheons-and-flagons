import { PlayerForm } from "./player/PlayerForm.js"
import { getPlayers } from "./player/PlayerProvider.js"
import { getTeams } from "./team/TeamProvider.js"
import { TeamForm } from "./team/TeamForm.js"
import { getScores } from "./scoretrackers/ScoreProvider.js"
import { Leaderboard } from "./scoretrackers/leaderboard/Leaderboard.js"


getTeams()
    .then(getScores)
    .then(getPlayers)
    .then(PlayerForm)
    .then(TeamForm)
    .then(Leaderboard)