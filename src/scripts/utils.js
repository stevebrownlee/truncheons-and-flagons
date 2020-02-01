const closeButton = document.querySelector(".button--close")
const messageBox = document.querySelector(".messageBox")
const message = document.querySelector(".message")

closeButton.addEventListener("click", e => messageBox.close())

export const alert = msg => {
    message.textContent = msg
    messageBox.showModal()
}

const singularize = str => {
    const isPlural = str.split("").reverse()[0] === "s"
    return isPlural ? str.substring(0, str.length-1) : str
}

export const StateChangeEvent = new Proxy(CustomEvent, {
    construct(target, args) {
        const eventName = args[0]
        args[0] = `${singularize(args[0])}StateChanged`
        args[1] = {
            detail: {
                [eventName]: args[1]
            }
        }
        console.log(`Application state was modified with the \`${args[0]}\` event`)
        return new target(...args);
    }
})
