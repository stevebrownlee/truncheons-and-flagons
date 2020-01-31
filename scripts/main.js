import { getPlayers } from "./player/PlayerProvider.js"
import { getTeams } from "./team/TeamProvider.js"
import { getScores } from "./scoretrackers/ScoreProvider.js"
import { TruncheonsFlagons } from "./TruncheonsFlagons.js"


getTeams()
    .then(getScores)
    .then(getPlayers)
    .then(TruncheonsFlagons)