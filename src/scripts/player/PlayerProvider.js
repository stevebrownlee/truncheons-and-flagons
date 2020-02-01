import { StateChangeEvent } from "../utils.js"

const applicationEventHub = document.querySelector(".container")

let players = []

const setPlayers = newPlayers => {
    if (Array.isArray(newPlayers)) {
        players = newPlayers
    }

    applicationEventHub.dispatchEvent(
        new StateChangeEvent("players", players.slice())
    )
}

export const usePlayers = () => players.slice()

export const getPlayers = () => {
    return fetch("http://localhost:8085/players")
        .then(response => response.json())
        .then(setPlayers)
}

export const addPlayer = player => {
    return fetch("http://localhost:8085/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
    })
        .then(response => response.json())
        .then(getPlayers)
}