import React, { useEffect, useMemo, useState } from 'react';
import Header from '../widgets/header';
import MovieCard from '../features/movies/MovieCard';
import { fetchMovies } from '../features/movies/service';
import type { Movie } from '../features/movies/types';
import '../features/movies/movies.css';
import MovieCardSkeleton from '../features/movies/MovieCardSkeleton';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchMovies().then((data) => {
      if (mounted) {
        setMovies(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, query]);

  return (
    <div>
      <Header>
        <input
          aria-label="Поиск фильмов"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Header>

      <main className="home">
        {loading ? (
          <section>
    <h2>Фильмы</h2>

    <div className="movies-grid">
      {Array.from({ length: 10 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
          </section>
        ) : (
          <section>
            <h2>Фильмы</h2>
            <div className="movies-grid">
              {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {filtered.length === 0 && <p>Ничего не найдено.</p>}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
