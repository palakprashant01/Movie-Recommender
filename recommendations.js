$(function() {
  // Disable the button until there is input in the text field
  const inputField = document.getElementById('autoComplete');
  
  const handleInputChange = function(event) {
    if (event.target.value === "") {
      $('.movie-button').attr('disabled', true);
    } else {
      $('.movie-button').attr('disabled', false);
    }
  }
  
  inputField.addEventListener('input', handleInputChange);

  $('.movie-button').on('click', function() {
    const apiKey = '946fa1086faaad332e1cd45a5175eaf2';
    const movieTitle = $('.movie').val();
    
    if (movieTitle === "") {
      $('.results').css('display', 'none');
      $('.fail').css('display', 'block');
    } else {
      fetchMovieDetails(apiKey, movieTitle);
    }
  });
});

// Invoked when clicking on the recommended movies
function recommendMovieCard(event) {
  const apiKey = '946fa1086faaad332e1cd45a5175eaf2';
  const movieTitle = event.getAttribute('title'); 
  fetchMovieDetails(apiKey, movieTitle);
}

// Fetch basic movie details from the API based on the movie name
function fetchMovieDetails(apiKey, title) {
  $.ajax({
    type: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + title,
    success: function(response) {
      if (response.results.length < 1) {
        $('.fail').css('display', 'block');
        $('.results').css('display', 'none');
        $("#loader").delay(500).fadeOut();
      } else {
        $("#loader").fadeIn();
        $('.fail').css('display', 'none');
        $('.results').delay(1000).css('display', 'block');
        const movieId = response.results[0].id;
        const movieTitle = response.results[0].original_title;
        fetchRecommendedMovies(movieTitle, movieId, apiKey);
      }
    },
    error: function() {
      alert('Invalid Request');
      $("#loader").delay(500).fadeOut();
    },
  });
}

// Pass the movie name to get similar movies from Flask
function fetchRecommendedMovies(movieTitle, movieId, apiKey) {
  $.ajax({
    type
