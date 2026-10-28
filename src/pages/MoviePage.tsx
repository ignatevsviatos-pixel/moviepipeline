import {useState, useEffect} from 'react';
import './MoviePage.css';
import {useParams} from 'react-router-dom';
import type { Movie } from '../features/movies/types';
import { fetchMovieById } from '../features/movies/service';
import MoviePageSkeleton from './MoviePageSkeleton';
import { useFavorites } from '../context/FavoriteContext';

const MoviePage = () => {

  const { id } = useParams();

	const { isFavorite, toggleFavorite } = useFavorites();

	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState(true);
	

	useEffect(() => {
		if (!id) return;
		fetchMovieById(id).then((data) => {
			setMovie(data);
		}).finally(() => {
			setLoading(false);
		});
	}, [id]);

	if (loading) {
		return (
				<MoviePageSkeleton />
		);
	}

	if (!movie) {
		return (
			<p>Фильм не найден</p>
		);
	}

  return (
    <main className="movie-page">
      <div className="movie-page__container">

        <button className="movie-page__back">
          ← Назад
        </button>

        <section className="movie-hero">

          <div className="movie-hero__poster">
            <img className="movie-hero__poster-placeholder" src={movie.poster} alt="Постер фильма" />
          </div>

          <div className="movie-hero__content">

            <div className="movie-hero__header">
              <h1>{movie.title}</h1>

              <span className="movie-hero__year">
                {movie.year}
              </span>
            </div>

            <div className="movie-hero__rating">
              <span>★</span>
              <strong>{movie.rating?.toFixed(1)}</strong>
              <span className="rating-max">/ 10</span>
            </div>

            <div className="movie-hero__meta">
              <span>{movie.runtime}</span>
              <span>•</span>
              <span>18+</span>
            </div>

            <div className="movie-hero__genres">
              <span>{movie.genres?.join(', ')}</span>
            </div>

            <div className="movie-hero__description">
              <h2>Описание</h2>

              <p>
                {movie.overview}
              </p>
            </div>

            <div className="movie-hero__actions">
              <button className="button button--primary">
                ▶ Смотреть
              </button>

              <button className="button button--secondary" onClick={() => toggleFavorite(movie.id)}>
                {isFavorite(movie.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
              </button>
            </div>

          </div>
        </section>

        <section className="movie-section">
          <h2>О фильме</h2>

          <div className="movie-info">

            <div className="movie-info__item">
              <span>Год</span>
              <strong>{movie.year}</strong>
            </div>

            <div className="movie-info__item">
              <span>Страна</span>
              <strong>{movie.country}</strong>
            </div>

            <div className="movie-info__item">
              <span>Режиссёр</span>
              <strong>{movie.director}</strong>
            </div>

            <div className="movie-info__item">
              <span>Сценарий</span>
              <strong>{movie.screenplay}</strong>
            </div>

            <div className="movie-info__item">
              <span>Возраст</span>
              <strong>{movie.ageRating}</strong>
            </div>

            <div className="movie-info__item">
              <span>Продолжительность</span>
              <strong>{movie.runtime}</strong>
            </div>

          </div>
        </section>

        <section className="movie-section">
          <div className="movie-section__header">
            <h2>Актёры</h2>
          </div>

          <div className="actors-placeholder">
            Здесь позже появятся актёры фильма
          </div>
        </section>

        <section className="movie-section">
          <div className="movie-section__header">
            <h2>Трейлер</h2>
          </div>

          <div className="trailer-placeholder">
            <span>▶</span>
            <p>Здесь будет трейлер</p>
          </div>
        </section>

        <section className="movie-section">
          <div className="movie-section__header">
            <h2>Похожие фильмы</h2>
          </div>

          <div className="similar-placeholder">
            Здесь позже появятся похожие фильмы
          </div>
        </section>

      </div>
    </main>
  );
};

export default MoviePage;