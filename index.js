const mainWithData = document.getElementById('main-with-data')
const submitBtn = document.getElementById('search-btn')
let searchInput = document.getElementById('search-input')


let title
let rating
let genre
let runTime
let reJoinArray = ""

// let poster = fetch("http://www.img.omdbapi.com/?apikey=ff25376c&t=Blade+Runner").then(res => res.json()).
//                         then(posterImg => console.log(posterImg))
// fetch("http://img.omdbapi.com/?apikey=ff25376c&t=Blade+Runner").
//         then(res => res.json()).
//         then(posterImg => console.log(posterImg))

function returnedString(){
    let string = searchInput.value
    .split(' ')
    .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join('+')
    reJoinArray = string
}

function itemData(){
fetch(`http://www.omdbapi.com/?apikey=ff25376c&s=${reJoinArray}`)
    .then(res => res.json())
    .then(data => {
        data.Search.slice(0, 5).forEach((film, i) => {
        //    console.log(`This is the id of the ${i} film: `, film.imdbID )
           fetch(`http://www.omdbapi.com/?apikey=ff25376c&i=${film.imdbID}`)
           .then(res => res.json())
           .then(data => {
            console.log("This is data: ", data)
            document.querySelector('.main-no-data').style.display = "none"
            mainWithData.innerHTML += `
            <div class="card-wrapper">
                <img class="poster" src="${data.Poster}">
                <div class="text-wrapper">
                    <div class="text-wrapper-title-rating">
                        <div class="title">${data.Title}</div>
                        <div class="rating"> ⭐ ${data.imdbRating}</div>
                    </div>
                    <div class="text-wrapper-runtime-genre-btn">
                        <div>${data.Runtime}</div>
                        <div>${data.Genre}</div>
                        <div><i class="fa-solid fa-square-plus"></i></div>
                        <button class="watchlist-btn" id="watchlist-btn">Watchlist</div>
                        <div class="plot">${data.Plot}</div>
                    </div>
                </div>
            </div>
            <br>
            `
           })
        });
    })
}
submitBtn.addEventListener('click', function(){
    returnedString()
    itemData()
}
)