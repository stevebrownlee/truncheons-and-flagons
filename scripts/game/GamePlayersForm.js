import { useTeams } from "../team/TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".gamePlay")

componentContainer.addEventListener("change", e => {
    const elementName = e.target.name

    if (elementName === "first" || elementName === "second" || elementName === "third") {
        applicationEventHub.dispatchEvent(
            new CustomEvent("teamSelectedForGame", {
                detail: {
                    cardinality: elementName,
                    teamId: e.target.value
                }
            })
        )
    }
})

const render = () => {
    const teams = useTeams()

    componentContainer.innerHTML = `
        <select name="first">
            <option value="0">Select first team...</option>
            ${
                teams.map(t => `<option value="${t.id}">${t.moniker}</option>`).join("")
            }
        </select>
        <select name="second">
            <option value="0">Select second team...</option>
            ${
                teams.map(t => `<option value="${t.id}">${t.moniker}</option>`).join("")
            }
        </select>
        <select name="third">
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