import { useTeams } from "../team/TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".gamePlay")

componentContainer.addEventListener("click", clickEvent => {
    const moniker = componentContainer.querySelector("input[name='moniker']")

    if (clickEvent.target.id === "addTeam") {
        addTeam({
            moniker: moniker.value
        })
            .then(() => {
                moniker.value = ""
                moniker.focus()
            })
    }
})

const render = ({ first, second, third, currentRound: round }) => {
    const teams = useTeams()
    componentContainer.innerHTML = `
        <h1>Round ${round}</h1>
        <fieldset>
            <label for="first">${teams.find(t => t.id === first).moniker}</label>
            <input name="first" autofocus type="text" />
        </fieldset>
        <fieldset>
            <label for="second">${teams.find(t => t.id === second).moniker}</label>
            <input name="second" type="text" />
        </fieldset>
        <fieldset>
            <label for="third">${teams.find(t => t.id === third).moniker}</label>
            <input name="third" type="text" />
        </fieldset>
        <button id="addTeam">Save Round Scores</button>
    `
}

export const ScoreForm = ({ ...props }) => {
    render({ ...props })
}
