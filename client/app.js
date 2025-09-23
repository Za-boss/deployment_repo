console.log("hi")
const main = () => {
    let data = getData()
}
const loadMessages = () => {
    const addElement = (element) => {
        let parentDiv = document.querySelector("#messageBoard")
        let div = document.createElement("div")
        let name = document.createElement("h3")
        let message = document.createElement("p")

        name.textContent = element.name
        message.textContent = element.message
        parentDiv.append(div)
        div.append(name)
        div.append(message)
    }

    fetch("http://localhost:5000/messages")
    .then(response => {
        response.json()
        .then(data => {
            console.log(data)
            document.querySelector("#messageBoard").innerHTML = ""
            data.forEach(element => {
                addElement(element)
            });
        })
    })
}

const sendData = () => {
    let name = document.querySelector("#name").value

    let message = document.querySelector("#message").value


    let data = "name="+encodeURIComponent(name)
    data += "&message="+encodeURIComponent(message)

    fetch("http://localhost:5000/messages", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        if (response.ok) {
            loadMessages()
            console.log("post successful")
        } else {
            console.log("post failure")
        }
    })
}

document.querySelector("#submit").addEventListener("click", sendData)
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
})
loadMessages()