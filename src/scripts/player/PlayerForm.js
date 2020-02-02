import { addPlayer } from "./PlayerProvider.js"
import { useTeams } from "../team/TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".playerForm")

applicationEventHub.addEventListener("teamStateChanged", event => {
    render(event.detail.teams)
})

componentContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addPlayer") {
        const chosenTeam = componentContainer.querySelector("select[name='team']")
        const firstName = componentContainer.querySelector("input[name='firstName']")
        const lastName = componentContainer.querySelector("input[name='lastName']")

        if (chosenTeam.value > 0 && firstName.value !== "" && lastName.value !== "") {
            addPlayer({
                firstName: firstName.value,
                lastName: lastName.value,
                teamId: parseInt(chosenTeam.value, 10)
            })
                .then(() => {
                    firstName.value = ""
                    lastName.value = ""
                    chosenTeam.value = 0
                })
        }
    }
})

const render = teamArray => {
    componentContainer.innerHTML = `
        <h3>New Player</h3>
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