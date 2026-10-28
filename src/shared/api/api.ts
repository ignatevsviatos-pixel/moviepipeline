const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));