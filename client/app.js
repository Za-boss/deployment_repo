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
fetch("http://localhost:5000")
.then(response => {
    response.json()
    .then(data => {
        console.log(data)
        data.forEach(element => {
            loadPainThings(element)
        });
    })
})
