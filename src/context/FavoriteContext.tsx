import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FavoritesContextType = {
  favorites: number[];
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movieId: number) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const loadFavorites = async () => {
    const response = await fetch(
      "http://localhost:3001/api/favorites",
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось получить избранное");
    }

    const data = await response.json();

    const movieIds = data.favorite.map(
      (item: { movie_id: number }) => item.movie_id
    );

    setFavorites(movieIds);
  };

  const isFavorite = (movieId: number) => {
    return favorites.includes(movieId);
  };

  const toggleFavorite = async (movieId: number) => {
    if (isFavorite(movieId)) {
      const response = await fetch(
        `http://localhost:3001/api/favorites/${movieId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось удалить фильм");
      }

      setFavorites((prev) =>
        prev.filter((id) => id !== movieId)
      );
    } else {
      const response = await fetch(
        `http://localhost:3001/api/favorites/${movieId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось добавить фильм");
      }

      setFavorites((prev) => [...prev, movieId]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites должен использоваться внутри FavoritesProvider"
    );
  }

  return context;
}