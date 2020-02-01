import { StateChangeEvent } from "../utils.js"

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
    return fetch("http://flagons.nss.team/teams")
        .then(response => response.json())
        .then(changeApplicationTeamState)
}

export const addTeam = team => {
    return fetch("http://flagons.nss.team/teams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
    })
        .then(response => response.json())
        .then(getTeams)
}