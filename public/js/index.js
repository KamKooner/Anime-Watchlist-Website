
document.getElementById('search-btn').addEventListener('click', function(){
    console.log("clicked")
});

fetch("http://www.omdbapi.com/?t=Sonic&apikey=60091a89")
.then(res => res.json())
.then(data => {
    console.log(data.Title)
})

