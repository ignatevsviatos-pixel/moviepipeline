import React from 'react';
import type { Movie } from './types';
import './movies.css';
import { Link } from 'react-router-dom';

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <article className="movie-card" aria-label={movie.title}>
      <div className="movie-poster-wrapper">
        {movie.poster ? (
          <img
            className="movie-poster"
            src={movie.poster}
            alt={`${movie.title} — постер`}
          />
        ) : (
          <div className="movie-poster movie-poster-placeholder">
            <span>{movie.title}</span>
          </div>
        )}

        {movie.rating !== undefined && (
          <div className="movie-rating">
            ★ {movie.rating.toFixed(1)}
          </div>
        )}

        <div className="movie-overlay">
					<Link to={`/movie/${movie.id}`} className='movie-action'>Подробнее</Link>
          
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-meta">
          {movie.year && <span>{movie.year}</span>}

          {movie.runtime && (
            <>
              <span className="meta-dot">•</span>
              <span>{movie.runtime}</span>
            </>
          )}
        </div>

        {movie.genres && movie.genres.length > 0 && (
          <div className="movie-genres">
            {movie.genres.slice(0, 2).join(' · ')}
          </div>
        )}
      </div>
    </article>
  );
};

export default MovieCard;