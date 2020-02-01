import { StateChangeEvent } from "../utils.js"

const applicationEventHub = document.querySelector(".container")

let scores = []

const changeScoreState = newScores => {
    if (Array.isArray(newScores)) {
        scores = newScores
    }

    applicationEventHub.dispatchEvent(
        new StateChangeEvent("scores", scores.slice())
    )
}

export const useScores = () => scores.slice()

export const getScores = () => {
    return fetch("http://flagons.nss.team/teamscores")
        .then(_ => _.json())
        .then(changeScoreState)
}

export const addScore = teamScore => {
    return fetch("http://flagons.nss.team/teamscores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamScore)
    })
        .then(_ => _.json())
        .then(getScores)
}