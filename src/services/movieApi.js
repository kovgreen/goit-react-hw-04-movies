export const getTrending = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=bcd4f45077c0e4d75bdfc6c2c2fe1685`
  )
    .then(res => res.json())
    .then(data => data.results);
};

export const getMovieDetails = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=bcd4f45077c0e4d75bdfc6c2c2fe1685`
  ).then(res => res.json());
};

export const searchMovies = (query = "", page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=bcd4f45077c0e4d75bdfc6c2c2fe1685&query=${query}&page=${page}`
  )
    .then(res => res.json())
    .then(data => data.results);
};

export const getMovieCredits = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bcd4f45077c0e4d75bdfc6c2c2fe1685`
  )
    .then(res => res.json())
    .then(data => data.results);
};

export const getMovieReviews = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=bcd4f45077c0e4d75bdfc6c2c2fe1685`
  )
    .then(res => res.json())
    .then(data => data.results);
};

export const imgpath = "https://image.tmdb.org/t/p/w185";
export const posterimgpath = `https://image.tmdb.org/t/p/w342/`;
