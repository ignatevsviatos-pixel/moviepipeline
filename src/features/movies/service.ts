import type { Movie } from './types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchMovies(): Promise<Movie[]> {
	await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    `${API_URL}`,
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  const data = await response.json();
	console.log('data:', data);

  return data.results.map((movie: any) => ({
    id: String(movie.id),
    title: movie.title,
    year: movie.release_date
      ? Number(movie.release_date.slice(0, 4))
      : undefined,
    rating: movie.vote_average,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined,
    overview: movie.overview,
  }));
}

export async function fetchMovieById(id: string): Promise<Movie> {
		await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=ru-RU&append_to_response=credits,release_dates`,
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  const movie = await response.json();
	console.log('Fetched movie:', movie);

	

  return {
    id: String(movie.id),
    title: movie.title,
    year: movie.release_date
      ? Number(movie.release_date.slice(0, 4))
      : undefined,
    rating: movie.vote_average,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined,
    overview: movie.overview,
    runtime: movie.runtime
      ? `${movie.runtime} мин`
      : undefined,
    genres: movie.genres?.map((genre: any) => genre.name),
		country: movie.origin_country,
		ageRating: movie.ageRating,
		director: movie.director,
		writers: movie.writers,
		screenplay: movie.screenplay,
  };
	
}







