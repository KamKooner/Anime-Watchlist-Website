
const apikey = "631193673b3ecb505ff6875ef4f0e6a1"
let baseURL = 'https://api.themoviedb.org/3/'
let query = `search/movie?api_key=${apikey}&query=`
let keyword = ""
let url = baseURL+query
let baseImageURL = null;
let title = null;
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
            for (let i=0; i<data.results.length ; i++){
                if (data.results[i].backdrop_path){
                    baseImageURL = 'https://image.tmdb.org/t/p/w342'+data.results[i].backdrop_path
                    title = data.results[i].original_title
                    console.log(title)
                    renderData(baseImageURL, title)
                }
               
            }
            
        })
    }

    function renderData(image, title){
        document.getElementById('s-res').innerHTML += `
        <div class="search-boxes">
            <h1>${title}</h1>
            <img src=${image}>
        </div>`
    }


   
     
    

    

