import { useTeams } from "../team/TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".gamePlay")

componentContainer.addEventListener("change", e => {
    const elementId = e.target.id

    if (elementId === "firstTeamSelect" || elementId === "secondTeamSelect" || elementId === "thirdTeamSelect") {
        applicationEventHub.dispatchEvent(
            new CustomEvent("teamSelectedForGame", {
                detail: {
                    cardinality: e.target.name,
                    teamId: e.target.value
                }
            })
        )
    }
})

const render = () => {
    const teams = useTeams()

    componentContainer.innerHTML = `
        <select id="firstTeamSelect" name="first">
            <option value="0">Select first team...</option>
            ${
                teams.map(t => `<option value="${t.id}">${t.moniker}</option>`).join("")
            }
        </select>
        <select id="secondTeamSelect" name="second">
            <option value="0">Select second team...</option>
            ${
                teams.map(t => `<option value="${t.id}">${t.moniker}</option>`).join("")
            }
        </select>
        <select id="thirdTeamSelect" name="third">
            <option value="0">Select third team...</option>
            ${
                teams.map(t => `<option value="${t.id}">${t.moniker}</option>`).join("")
            }
        </select>
    `
}

export const GamePlayersForm = () => {
    render()
}