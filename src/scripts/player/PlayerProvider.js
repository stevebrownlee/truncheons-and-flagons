import { StateChangeEvent } from "../utils.js"
import { settings } from "../Settings.js"

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
    return fetch(`${settings.apiUrl}/players`)
        .then(response => response.json())
        .then(setPlayers)
}

export const addPlayer = player => {
    return fetch(`${settings.apiUrl}/players`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
    })
        .then(response => response.json())
        .then(getPlayers)
}