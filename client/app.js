console.log("hi")
const main = () => {
    let data = getData()
}
const loadPainThings = (data) => {
    let parentDiv = document.querySelector("#amazingReviews")
    let div = document.createElement("div")
    let name = document.createElement("h3")
    let rating = document.createElement("h4")
    let length = document.createElement("h4")
    let painRating = document.createElement("h4")

    name.textContent = data.name
    rating.textContent = data.rating
    length.textContent = data.length
    painRating.textContent = data.painCounter
    parentDiv.append(div)
    div.append(name)
    div.append(rating)
    div.append(length)
    div.append(painRating)
}

const sendData = () => {
    let name = document.querySelector("#name").value

    let rating = document.querySelector("#rating").value

    let length = document.querySelector("#length").value

    let painRating = document.querySelector("#pain_rating").value

    let data = "name"+encodeURIComponent(name)
    data += "&rating"+encodeURIComponent(rating)
    data += "&length"+encodeURIComponent(length)
    data += "&painCounter"+encodeURIComponent(painRating)

    fetch("http://localhost:5000/traits", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        if (response.ok) {
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
fetch("http://localhost:5000/traits")
.then(response => {
    response.json()
    .then(data => {
        console.log(data)
        data.forEach(element => {
            loadPainThings(element)
        });
    })
})
