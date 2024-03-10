document.addEventListener('DOMContentLoaded', function() {
    const formElt = document.querySelector('form');
    const inputElt = document.querySelector('input');
    const sectionElt = document.querySelector('section');
    sectionElt.className = 'movie-cards';
    const favoritesKey = 'myFavoriteMovies';

    // Au chargement, afficher les favoris
    displayFavorites();

    // Écouteur d'événement pour la soumission du formulaire
    formElt.addEventListener('submit', function(e) {
        e.preventDefault();
        fetchMovies(inputElt.value);
    });

    function fetchMovies(film) {
        const url = `https://www.omdbapi.com/?apikey=3e2a6234&s=${encodeURIComponent(film)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const movies = data.Search || [];
                displayMovies(movies);
            });
    }

    function displayMovies(movies) {
        clearMoviesDisplay();
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'card';
            movieElement.innerHTML = `
                <img class="card-img-top" src="${movie.Poster}" alt="">
                <p class="card-title">${movie.Title}</p>
                <p>${movie.Year}</p>
                <button class="btn btn-primary add-to-favorites">Ajouter aux favoris</button>
            `;
            sectionElt.appendChild(movieElement);

            movieElement.querySelector('.add-to-favorites').addEventListener('click', () => addFavorite(movie));
        });
    }

    function clearMoviesDisplay() {
        sectionElt.innerHTML = '';
    }

    function addFavorite(movie) {
        let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
            favorites.push(movie);
            localStorage.setItem(favoritesKey, JSON.stringify(favorites));
            displayFavorites();
        }
    }

    function displayFavorites() {
        const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        const favoritesElt = document.querySelector('.favorites');
        favoritesElt.innerHTML = '<h2>Favoris</h2>';
        favorites.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `<p>${movie.Title} (${movie.Year})</p>`;
            favoritesElt.appendChild(movieElement);
        });
    }
});
