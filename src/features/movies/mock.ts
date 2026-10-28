import type { Movie } from './types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Побег во тьму',
    year: 1982,
    rating: 8.1,
    poster: 'https://via.placeholder.com/200x300?text=Побег+во+тьму',
    genres: ['Sci-Fi', 'Thriller'],
    overview: 'Классический научно-фантастический фильм с атмосферой нуара.',
  },
  {
    id: '2',
    title: 'Ночной город',
    year: 1995,
    rating: 7.4,
    poster: 'https://via.placeholder.com/200x300?text=Ночной+город',
    genres: ['Drama'],
    overview: 'Медитативная драма про жизнь в большом городе.',
  },
  {
    id: '3',
    title: 'Космический рубеж',
    year: 2010,
    rating: 7.9,
    poster: 'https://via.placeholder.com/200x300?text=Космический+рубеж',
    genres: ['Adventure', 'Sci-Fi'],
    overview: 'Приключенческий фильм о первой экспедиции к далёкой планете.',
  },
  {
    id: '4',
    title: 'Тихая ночь',
    year: 2020,
    rating: 6.8,
    poster: 'https://via.placeholder.com/200x300?text=Тихая+ночь',
    genres: ['Horror'],
    overview: 'Небольшой хоррор с минималистичным подходом.',
  },
  {
    id: '5',
    title: 'Луч света',
    year: 2005,
    rating: 7.2,
    poster: 'https://via.placeholder.com/200x300?text=Луч+света',
    genres: ['Drama', 'Romance'],
    overview: 'Трогательная история о надежде и встречах.',
  },
];
