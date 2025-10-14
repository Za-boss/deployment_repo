const load_messages = () => {
    const addElement = (element) => {
        let parentDiv = document.querySelector("#messageBoard")
        let div = document.createElement("div")
        let name = document.createElement("h3")
        let message = document.createElement("p")
        let image = document.createElement("img")
        let delete_button = document.createElement("button")

        let id = element.id

        delete_button.addEventListener("click", () => delete_data(id))

        console.log(id)

        name.textContent = element.name
        message.textContent = element.message
        delete_button.textContent = "Delete"
        image.src = element.image
        image.alt = ""
        parentDiv.append(div)
        div.append(name)
        div.append(message)
        div.append(image)
        div.append(delete_button)
    }

    fetch("http://localhost:5000/messages")
    .then(response => {
        response.json()
        .then(data => {
            document.querySelector("#messageBoard").innerHTML = ""
            data.forEach(element => {
                addElement(element)
            });
        })
    })
}

const delete_data = (id) => {
    fetch(`http://localhost:5000/messages/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.status == 204) {
            console.log("deleted")
            load_messages()
        } else if (response.status == 404) {
            console.warn("message not found")
        } else {
            console.error("Delete failed", response.status)
        }
    })
}

const send_data = () => {
    let name = document.querySelector("#name").value

    let message = document.querySelector("#message").value

    let image = document.querySelector("#image").value
    let data = "name="+encodeURIComponent(name)
    data += "&message="+encodeURIComponent(message)
    data += "&image="+encodeURIComponent(image)

    fetch("http://localhost:5000/messages", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        if (response.ok) {
            load_messages()
            console.log("post successful")
        } else {
            console.log("post failure")
        }
    })
}
document.querySelector("#form-button").addEventListener("click", send_data)

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
})
load_messages()