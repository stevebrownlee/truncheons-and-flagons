import { addPlayer } from "./PlayerProvider.js"
import { useTeams } from "../team/TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".playerForm")

applicationEventHub.addEventListener("teamStateChanged", event => {
    render(event.detail.teams)
})

componentContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addPlayer") {
        const chosenTeam = componentContainer.querySelector("select[name='team']").value
        if (chosenTeam > 0) {
            addPlayer({
                firstName: componentContainer.querySelector("input[name='firstName']").value,
                lastName: componentContainer.querySelector("input[name='lastName']").value,
                teamId: parseInt(componentContainer.querySelector("select[name='team']").value)
            })
        }
    }
})

const render = teamArray => {
    componentContainer.innerHTML = `
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

        <button class="btn btn--success btn--small" id="addPlayer">Add Player to Team</button>
    `
}

export const PlayerForm = () => {
    const teams = useTeams()
    render(teams)

}