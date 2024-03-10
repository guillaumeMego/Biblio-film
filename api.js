
function api(film) {
    const url = "https://www.omdbapi.com/?apikey=3e2a6234&s=" + film ;
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
                const movies = data.Search;
                return movies;
            }
        );
}

export default api;