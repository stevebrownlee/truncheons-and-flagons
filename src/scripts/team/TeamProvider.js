import { StateChangeEvent } from "../utils.js"
import { settings } from "../Settings.js"

const applicationEventHub = document.querySelector(".container")

let teams = []

const changeApplicationTeamState = newTeams => {
    if (Array.isArray(newTeams)) {
        teams = newTeams
    }

    applicationEventHub.dispatchEvent(
        new StateChangeEvent("teams", teams.slice())
    )
}

export const useTeams = () => teams.slice()

export const getTeams = () => {
    return fetch(`${settings.apiUrl}/teams?_embed=players`)
    .then(response => response.json())
    .then(changeApplicationTeamState)
}

applicationEventHub.addEventListener("playerStateChanged", getTeams)

export const addTeam = team => {
    return fetch(`${settings.apiUrl}/teams`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
    })
        .then(response => response.json())
        .then(getTeams)
}