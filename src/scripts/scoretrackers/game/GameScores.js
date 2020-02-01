import { useTeams } from "../../team/TeamProvider.js"

const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".gameScores")

applicationEventHub.addEventListener("roundCompleted", e => {
    // const scores = e.detail.scores

    // for (const [team, score] of Object.entries(scores)) {
    //     const currentTeam = activeTeams.get(team)
    //     currentTeam.score += parseInt(score, 10)
    // }

    // render()
})

const render = (activeTeams, teams) => {
    componentContainer.innerHTML = `
        <h3>Current Game</h3>
        <div className="teams">
            <div class="team team__header">
                <div class="team__columnHeader team__name">Name</div>
                <div class="team__columnHeader team__score">Score</div>
            </div>

            ${
                [...activeTeams].map(([key, teamScore]) => {
                    const team = teams.find(t => t.id === teamScore.teamId) || null

                    if (team !== null) {
                        return `
                                <div class="team">
                                    <div class="team__column team__name">${team.moniker}</div>
                                    <div class="team__column team__score">${teamScore.score}</div>
                                </div>
                            `
                    }
                }).join("")
            }
        </div>
    `



    // for (const [key, teamScore] of activeTeams) {
    //     const team = teams.find(t => t.id === teamScore.teamId) || null

    //     if (team !== null) {
    //         componentContainer.innerHTML += `
    //             <div>
    //                 ${team.moniker}: ${teamScore.score}
    //             </div>
    //         `
    //     }
    // }
}

export const GameScore = (activeTeams) => {
    const teams = useTeams()
    render(activeTeams, teams)
}