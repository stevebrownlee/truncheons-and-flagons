const applicationEventHub = document.querySelector(".container")
const componentContainer = document.querySelector(".gamePlay")

const startBtn = document.createElement("button")
startBtn.className = "btn--warning btn--lg btn--startGame"
startBtn.textContent = "Start New Game"
startBtn.onclick = e => {
    applicationEventHub.dispatchEvent( new CustomEvent("gameStarted") )
}

export const StartRound = () => {
    componentContainer.innerHTML = ""
    componentContainer.appendChild(startBtn)
}
