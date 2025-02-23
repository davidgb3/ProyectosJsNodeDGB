import { useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites"
import { useAuth } from "../contexts/AuthContext";
import MovieCardFavorites from "../components/MovieCardFavorites";

const Favourites = () => {

  const { user } = useAuth();
  const { favorites, loading, error, getFavoriteList } = useFavorites();

  useEffect(() => {
    const loadFavorites = async () => {
        if (user?.id) {
            try {
                await getFavoriteList();
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
            }
        }
    };

    loadFavorites();
}, [user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Cargando favoritos...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!favorites?.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">No hay películas favoritas</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mis Películas Favoritas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites?.map(movie => (
          <MovieCardFavorites 
            key={movie.id} 
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites