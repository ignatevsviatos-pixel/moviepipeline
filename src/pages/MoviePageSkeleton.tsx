import React from 'react';
import '../features/movies/movies.css';

const MoviePageSkeleton: React.FC = () => {
  return (
    <div className="movie-page">
      <div className="movie-page-backdrop-skeleton" />

      <main className="movie-page-content">
        <div className="movie-page-main">
          
          <div className="skeleton movie-page-poster-skeleton" />

          <div className="movie-page-info">
            <div className="skeleton movie-page-title-skeleton" />

            <div className="movie-page-meta-skeleton">
              <div className="skeleton movie-page-meta-item-skeleton" />
              <div className="skeleton movie-page-meta-item-skeleton" />
              <div className="skeleton movie-page-meta-item-skeleton" />
            </div>

            <div className="movie-page-rating-skeleton">
              <div className="skeleton movie-page-rating-number-skeleton" />
              <div className="skeleton movie-page-rating-text-skeleton" />
            </div>

            <div className="movie-page-description-skeleton">
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
            </div>
          </div>

        </div>

        <div className="movie-page-details-skeleton">
          <div className="skeleton skeleton-details-title" />

          <div className="skeleton skeleton-details-line" />
          <div className="skeleton skeleton-details-line" />
          <div className="skeleton skeleton-details-line" />
          <div className="skeleton skeleton-details-line" />
        </div>

        <div className="movie-page-cast-skeleton">
          <div className="skeleton skeleton-cast-title" />

          <div className="movie-page-cast-grid-skeleton">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="cast-skeleton-card" key={index}>
                <div className="skeleton cast-skeleton-photo" />
                <div className="skeleton cast-skeleton-name" />
                <div className="skeleton cast-skeleton-character" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoviePageSkeleton;