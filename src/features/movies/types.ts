export type Movie = {
  id: number;
  title: string;
  year?: number;
  rating?: number; // 0-10
  poster?: string; // url
  genres?: string[];
  runtime?: string;
  overview?: string;

	country?: string[];
  director?: string;
  writers?: string[];
  ageRating?: string;
	screenplay?: string;
};
