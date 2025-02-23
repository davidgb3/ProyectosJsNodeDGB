import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
const VITE_MONGODB_URL = import.meta.env.VITE_MONGODB_URL;

export const useFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const addFavorites = async (userId, movieId) => {
        try {
            const response = await fetch(`${VITE_MONGODB_URL}/movies/addFavorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id_user: userId.toString(), 
                    id_movie: parseInt(movieId) 
                })
            });
    
            const data = await response.json();
            // setFavorites(prevFavorites => [...prevFavorites, data.data]);
            return data;
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getFavoriteList = async () => {
        try {
            const response = await fetch(`${VITE_MONGODB_URL}/movies/favorites/${user.id}`);
            if(!response.ok){
                throw new Error("Error al traer las peliculas favoritas");
            }
            const data = await response.json();
            setFavorites(data);
            console.log(data);
            return data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteFromFavorites = async (userId, movieId) => {
        try {
            const response = await fetch(`${VITE_MONGODB_URL}/movies/deleteFromFavorites`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_user: userId.toString(),
                    id_movie: parseInt(movieId)
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { favorites, error, loading, setFavorites, addFavorites, getFavoriteList, deleteFromFavorites };
}; 

