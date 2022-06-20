
const apikey = "631193673b3ecb505ff6875ef4f0e6a1"
let baseURL = 'https://api.themoviedb.org/3/'
let query = `search/movie?api_key=${apikey}&query=`
let keyword = ""
let url = baseURL+query
let baseImageURL = null;
let title = null;
let rating = null;
let overview = null;
let genreArr = null;
let releaseDate = null;
let totalres = null;
var input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("search-btn").click();
      document.getElementById('search').value = ""
    }
})




document.getElementById('search-btn').addEventListener("click", searchBtnClick)

    function searchBtnClick(){
        keyword = document.getElementById('search').value
        url = baseURL+query
        url += keyword
        console.log(url)
        document.getElementById('s-res').innerHTML = "";
        fetcher(url)
    }

    function fetcher(url){
        fetch(url) 
        .then(res => res.json())
        .then(data => {
            totalres = data.total_results
            if (totalres === 0 ){
                console.log(totalres)
                document.getElementById('s-res').innerHTML += `
                <p class='no-res'> No movies with that title found.</p>
            `
            }
            for (let i=0; i<data.results.length ; i++){
                if (data.results[i].backdrop_path){
                    baseImageURL = 'https://image.tmdb.org/t/p/w342'+data.results[i].backdrop_path
                    title = data.results[i].original_title
                    rating = data.results[i].vote_average
                    overview = data.results[i].overview
                    releaseDate = data.results[i].release_date
                    
                    
                    
                    if (!releaseDate){
                        releaseDate = 'N/A'
                    }
                    genreArr = data.results[i].genre_ids
                    const genre = {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}
                    const mappedGenre = genreArr.map(x => {
                        for (let i=0; i<genre.genres.length; i++){
                            if (x === genre.genres[i].id){
                                return genre.genres[i].name
                            }
                        }
                    })
                    
                    renderData(baseImageURL, title, rating, overview,releaseDate, mappedGenre.slice(0,3).join(', '), totalres)
                }
               
            }
            
        })
    }

    function renderData(image, title, rating, overview,releaseDate, mappedGenre, totalres){
        if(totalres != 0){
        console.log(totalres)
        document.getElementById('s-res').innerHTML += `
        <div class="search-boxes">
            <div class='img-divide'> 
                <img src=${image}>
                <div class='movie-description'>
                    <h1 id='title'>${title} <img class='star' src='/img/star.png'> <span class='rating'>${rating}</span></h1>
                    <div class='sub-det'>
                        <span id='rel'>Release Date: ${releaseDate}</span>
                        <span id='gen'>Genres: ${mappedGenre}</span>
                        <span id='btn'>
                        <a onclick="location.href='/watchlist'" type="button" class='watch-btn'><img class='watch-btn' name="jsbutton" src="/img/Watchlist-btn.png" width="16" height="16" border="0"> Watchlist</a>    
                        </span>
                    </div>
                    
                    <p class='overview'>${overview}</p>
                </div>
                
                
            </div>
        </div>`
        }
    }
    

   
     
    

    

