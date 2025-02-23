import { Link } from "react-router-dom";
import { getImageUrl } from "../services/tmdb";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const MovieCardFavorites = ({ movie }) => {

    const { deleteFromFavorites, getFavoriteList } = useFavorites();
    const { user } = useAuth();
    const handleFavorites = async () => {
        if (!user) {
            toast.error('Debes iniciar sesión para agregar favoritos', {
                duration: 2000,
                position: 'bottom-right',
            });
            return;
        }

        console.log(user.id);
        console.log(movie.id);

        try {
            await deleteFromFavorites(user.id, movie.id);
            await getFavoriteList();
            toast.success(`¡${movie.title} eliminada de favoritos!`, {
                duration: 2000,
                position: 'bottom-right',
                style: {
                    background: '#333',
                    color: '#fff',
                }
            });
        } catch (error) {
            toast.error(error.message || 'Error al eliminar de favoritos', {
                duration: 2000,
                position: 'bottom-right',
            });
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Link to={`/movie/${movie.id}`}>
                <img 
                    src={getImageUrl(movie.poster_path)} 
                    alt={movie.title} 
                    className="w-500 h-[400px] object-cover"
                />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{movie.title} | <Link className="hover:text-2xl transition-all duration-150" onClick={handleFavorites}>💔</Link></h3>
                <p className="text-gray-600 text-sm">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
        </div>
    );
};

export default MovieCardFavorites;
