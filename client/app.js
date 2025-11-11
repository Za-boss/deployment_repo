const SERVER_URL = "http://localhost:5000"
const load_messages = () => {
    const addElement = (element) => {
        let parentDiv = document.querySelector("#messageBoard")
        let message_container_div = document.createElement("div")
        message_container_div.classList.add('message-container')

        // edit form creation

        let form = document.createElement("form")
        form.classList.add("message-form")
        form.classList.add("message-edit-form")
        form.style.display = "none"

        let title_label = document.createElement("label")
        title_label.textContent = "Title"
        title_label.htmlFor = "title"

        let title_input = document.createElement("input")
        title_input.type = "text"
        title_input.id = "title"
        title_input.name = "title"
        title_input.value = element.title
        title_input.placeholder = "Enter in the new title"

        let message_label = document.createElement("label")
        message_label.textContent = "Message"
        message_label.htmlFor = "message"

        let message_input = document.createElement("input")
        message_input.type = "text"
        message_input.id = "message"
        message_input.name = "message"
        message_input.value = element.message
        message_input.placeholder = "Enter in the new message"

        let image_label = document.createElement("label")
        image_label.textContent = "Image Link"
        image_label.htmlFor = "image"

        let image_input = document.createElement("input")
        image_input.type = "text"
        image_input.id = "image"
        image_input.name = "image"
        image_input.value = element.image
        image_input.placeholder = "Enter in the new image link"


        let submit_button = document.createElement("button")
        submit_button.classList.add("submit-button")
        submit_button.id = "form-button"
        submit_button.type = "button"
        submit_button.textContent = "Submit"

        let cancel_button = document.createElement("button")
        cancel_button.classList.add("cancel-button")
        cancel_button.id = "form-button"
        cancel_button.type = "button"
        cancel_button.textContent = "Cancel"

        form.append(title_label)
        form.append(title_input)
        form.append(message_label)
        form.append(message_input)
        form.append(image_label)
        form.append(image_input)
        form.append(submit_button)
        form.append(cancel_button)


        let content_div = document.createElement("div")
        content_div.classList.add('message-display')
        let title = document.createElement("h3")
        let message = document.createElement("p")
        let image = document.createElement("img")
        let delete_button = document.createElement("button")
        delete_button.classList.add("delete-button")
        delete_button.textContent = "Delete"
        let edit_button = document.createElement("button")
        edit_button.classList.add("edit-button")
        edit_button.textContent = "Edit"

        let id = element.id

        delete_button.addEventListener("click", () => delete_data(id))

        edit_button.addEventListener("click", () => {
            edit_message(id, content_div, form, submit_button)
        })
        cancel_button.addEventListener("click", () => {
            content_div.style.display = "block"
            form.style.display = "none"
            title_input.value = element.title
            message_input.value = element.message
            image_input.value = element.image
        })


        title.textContent = element.title
        message.textContent = element.message
        image.src = element.image
        image.alt = ""
        parentDiv.append(message_container_div)
        message_container_div.append(content_div)
        message_container_div.append(form)
        content_div.append(title)
        content_div.append(message)
        content_div.append(image)
        content_div.append(delete_button)
        content_div.append(edit_button)
    }
    fetch(`${SERVER_URL}/messages`)
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

const edit_message = (element_id, content_div, form, submit_button) => {
    content_div.style.display = "none"
    form.style.display = "flex"
    submit_button.addEventListener("click", () => {
        submit_edits(element_id)
    })
    const submit_edits = (id) => {
        const data = new FormData(form)
        let urldata = "title="+encodeURIComponent(data.get("title"))
        urldata += "&message="+encodeURIComponent(data.get("message"))
        urldata += "&image="+encodeURIComponent(data.get("image"))

        fetch(`${SERVER_URL}/mesages/${id}`, {
            method: "PUT",
            body: urldata,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then(response => {
            if (response.status == 204) {
            console.log("updated")
            load_messages()
            content_div.style.display = "block"
            form.style.display = "none"
            } else if (response.status == 404) {
                console.warn("message not found")
            } else {
                console.error("Update failed", response.status)
            }
        })
    }
}

const delete_data = (id) => {
    fetch(`${SERVER_URL}/messages/${id}`, {
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
    let title_input = document.querySelector(".new-message-form #title")

    let message_input = document.querySelector(".new-message-form #message")

    let image_input = document.querySelector(".new-message-form #image")
    let data = "title="+encodeURIComponent(title_input.value)
    data += "&message="+encodeURIComponent(message_input.value)
    data += "&image="+encodeURIComponent(image_input.value)

    fetch(`${SERVER_URL}/messages`, {
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

            title_input.value = ""
            message_input.value = ""
            image_input.value = ""
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