import { addTeam } from "./TeamProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".teamForm")

contentTarget.addEventListener("click", clickEvent => {
    const moniker = contentTarget.querySelector("input[name='moniker']")

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
    contentTarget.innerHTML = `
        <fieldset>
            <input name="moniker" autofocus type="text" placeholder="Team name" />
        </fieldset>
        <button id="addTeam">Create Team</button>
    `
}

export const TeamForm = () => {
    render()
}
