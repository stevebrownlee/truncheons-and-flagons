import { addPlayer } from "./PlayerProvider.js"
import { useTeams } from "../team/TeamProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".playerForm")

eventHub.addEventListener("teamStateChanged", event => {
    render(event.detail.teams)
})

contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addPlayer") {
        const chosenTeam = contentTarget.querySelector("select[name='team']").value
        if (chosenTeam > 0) {
            addPlayer({
                firstName: contentTarget.querySelector("input[name='firstName']").value,
                lastName: contentTarget.querySelector("input[name='lastName']").value,
                teamId: parseInt(contentTarget.querySelector("select[name='team']").value)
            })
        }
    }
})

const render = teamArray => {
    contentTarget.innerHTML = `
        <fieldset>
            <input name="firstName" type="text" placeholder="First name" />
        </fieldset>
        <fieldset>
            <input name="lastName" type="text" placeholder="Last name" />
        </fieldset>
        <fieldset>
            <select name="team">
                <option value="0">Please select a team...</option>
                ${
                    teamArray.map(team => `<option value="${team.id}">${team.moniker}</option>`)
                }
            </select>
        </fieldset>

        <button id="addPlayer">Add Player to Team</button>
    `
}

export const PlayerForm = () => {
    const teams = useTeams()
    render(teams)

}