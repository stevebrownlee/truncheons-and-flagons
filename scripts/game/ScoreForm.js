import { useTeams } from "../team/TeamProvider.js"
import { alert } from "../utils.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".gamePlay")

componentContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveRound") {
        const first = componentContainer.querySelector("input[name='first']")
        const second = componentContainer.querySelector("input[name='second']")
        const third = componentContainer.querySelector("input[name='third']")
        const totalEnteredPoints = parseInt(first.value) + parseInt(second.value) + parseInt(third.value)

        if (totalEnteredPoints === 3) {
            applicationEventHub.dispatchEvent(
                new CustomEvent("roundCompleted", {
                    detail: {
                        scores: {
                            first: first.value,
                            second: second.value,
                            third: third.value
                        }
                    }
                })
            )
        } else {
            alert(`You must record 3 total points for each round.
            You provided ${totalEnteredPoints || 0}.`)
        }
    }
})

export const ScoreForm = ({ first, second, third, currentRound: round }) => {
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
        <button class="btn btn--info" id="saveRound">Save Round Scores</button>
    `
    componentContainer.querySelector("input[name='first']").focus()
}
