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
    return fetch("http://localhost:8088/teamscores")
        .then(_ => _.json())
        .then(changeScoreState)
}

export const addScore = score => {
    return fetch("http://localhost:8088/teamscores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(score)
    })
        .then(_ => _.json())
        .then(getScores)
}