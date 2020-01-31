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

const render = () => {
    componentContainer.innerHTML = `
        <fieldset>
            <input name="first" autofocus type="text" />
        </fieldset>
        <fieldset>
            <input name="second" type="text" />
        </fieldset>
        <fieldset>
            <input name="third" type="text" />
        </fieldset>
        <button id="addTeam">Create Team</button>
    `
}

export const ScoreForm = () => {
    render()
}
