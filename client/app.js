const load_messages = () => {
    const addElement = (element) => {
        let parentDiv = document.querySelector("#messageBoard")
        let message_container_div = document.createElement("div")
        message_container_div.classList.add('message-container')

        let form_div = document.createElement("div")

        let content_div = document.createElement("div")
        content_div.classList.add('message-display')
        let title = document.createElement("h3")
        let message = document.createElement("p")
        let image = document.createElement("img")
        let delete_button = document.createElement("button")
        let edit_button = document.createElement("button")

        let id = element.id

        delete_button.addEventListener("click", () => delete_data(id))

        edit_button.addEventListener("click", () => {
            edit_message(id, form_div)
        })

        console.log(id)

        title.textContent = element.title
        message.textContent = element.message
        delete_button.textContent = "Delete"
        edit_button.textContent = "Edit"
        image.src = element.image
        image.alt = ""
        parentDiv.append(message_container_div)
        message_container_div.append(content_div)
        content_div.append(title)
        content_div.append(message)
        content_div.append(image)
        content_div.append(delete_button)
        content_div.append(edit_button)
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

const edit_message = (id) => {

    const submit_edits = (id, data) => {
        let urldata = "title="+encodeURIComponent(data.title)
        urldata += "&message="+encodeURIComponent(data.message)
        urldata += "&image="+encodeURIComponent(data.image)

        fetch(`http://localhost:5000/messages/${id}`, {
            method: "PUT",
            body: urldata,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
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
    let title = document.querySelector("#title").value

    let message = document.querySelector("#message").value

    let image = document.querySelector("#image").value
    let data = "title="+encodeURIComponent(title)
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