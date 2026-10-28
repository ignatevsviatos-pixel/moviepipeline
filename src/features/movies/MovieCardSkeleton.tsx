import React from 'react';

const MovieCardSkeleton: React.FC = () => {
  return (
    <article className="movie-card movie-card-skeleton">
      <div className="movie-poster-wrapper">
        <div className="skeleton skeleton-poster" />
      </div>

      <div className="movie-info">
        <div className="skeleton skeleton-title" />

        <div className="movie-meta">
          <div className="skeleton skeleton-meta" />
        </div>

        <div className="skeleton skeleton-genre" />
      </div>
    </article>
  );
};

export default MovieCardSkeleton;