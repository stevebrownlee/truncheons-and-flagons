import { addTeam } from "./TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".teamForm")

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

const render = () => {
    componentContainer.innerHTML = `
        <h3>New Team</h3>
        <fieldset>
            <input name="moniker" autofocus type="text" placeholder="Team name" />
        </fieldset>
        <button class="btn btn--success btn--small" id="addTeam">Create Team</button>
    `
}

export const TeamForm = () => {
    render()
}
