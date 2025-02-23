// src/controllers/product.controller.js
import dotenv from "dotenv";
import { Movie } from "../models/Movie.js";
import { Favorite } from "../models/Favorites.js";
const apiToken = process.env.API_TOKEN;
const apiUrl = process.env.API_URL;
const apiUrlImages= process.env.API_URL_IMAGES;

dotenv.config();

export const IMAGES_SIZES={
    POSTER:"w500",
    BACKDROP:"original"
}

export const getImageUrl =  (path,size=IMAGES_SIZES.POSTER) => {
    if(!path){
        return "/placeholder-movie.jpg"
    }
    return `${apiUrlImages}${size}/${path}`;
};

export const fetchFromApi = async (endpoint, options={}) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiToken}&language=es-ES&${new URLSearchParams(options)}`);
        if(!response.ok){
            throw new Error("Error en fetchFromApi");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error; // Propagamos el error
    }
}

export const getPopularMovies = async (page = 1) => {
    try {
        let allMovies = [];
        let currentPage = page;
        
        const firstPageData = await fetchFromApi("movie/popular", { page: currentPage });
        
        if (!firstPageData.results) {
            throw new Error("No se encontraron resultados");
        }

        const totalPages = firstPageData.total_pages;
        console.log(`📚 Total de páginas disponibles: ${totalPages}`);

        const firstPageMovies = firstPageData.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            release_date: movie.release_date
        }));

        const uniqueMovies = new Set(firstPageMovies.map(movie => movie.id));
        allMovies = [...firstPageMovies];
        console.log(`✅ Página ${currentPage} procesada`);

        while (currentPage < totalPages && currentPage < 100) { // Limitamos a 100 páginas por que hay mas de 40000 paginas de pelis en la API
            currentPage++;
            console.log(`🔄 Obteniendo página ${currentPage}...`);
            
            const nextPageData = await fetchFromApi("movie/popular", { page: currentPage });
            
            if (nextPageData.results) {
                const nextPageMovies = nextPageData.results
                    .filter(movie => !uniqueMovies.has(movie.id)) // Filtramos duplicados
                    .map(movie => {
                        uniqueMovies.add(movie.id); // Agregamos el ID al Set
                        return {
                            id: movie.id,
                            title: movie.title,
                            vote_average: movie.vote_average,
                            poster_path: movie.poster_path,
                            backdrop_path: movie.backdrop_path,
                            release_date: movie.release_date
                        };
                    });
                
                allMovies = [...allMovies, ...nextPageMovies];
                console.log(`✅ Página ${currentPage} procesada`);
            }
        }

        await Movie.insertMany(allMovies, { ordered: false });
        console.log(`📦 ${allMovies.length} películas guardadas en MongoDB correctamente`);
        
        return {
            movies: allMovies,
            totalPages,
            currentPage,
            totalMovies: allMovies.length
        };

    } catch (error) {
        console.error('❌ Error al obtener la data de la API -->', error.message);
        throw error;
    }
};

export const listMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const [movies, total] = await Promise.all([
            Movie.find({})
                .skip(skip)
                .limit(limit)
                .lean(), // Usamos lean() para mejor rendimiento
            Movie.countDocuments() // Contamos el total de películas
        ]);
        
        if (!movies || movies.length === 0) {
            throw new Error("No hay películas en la base de datos");
        }

        console.log(`📋 Se encontraron ${movies.length} películas en la BD`);
        return res.status(201).json(movies);
    } catch (error) {
        res.status(501).json({ message: `Error al obtener películas de la BD --> ${error.message}` })
    }
};

export const addToFavorites = async (req, res) => {
    try {
        const { id_user, id_movie } = req.body;

        // Validamos que existan los parámetros requeridos
        if (!id_user || !id_movie) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere id_user y id_movie'
            });
        }

        // Verificamos si la película existe
        const movieExists = await Movie.findOne({ id: id_movie });
        if (!movieExists) {
            return res.status(404).json({
                success: false,
                message: 'Película no encontrada'
            });
        }

        // Verificamos si ya está en favoritos
        const existingFavorite = await Favorite.findOne({ id_user, id_movie });
        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: 'La película ya está en favoritos'
            });
        }

        // Creamos el nuevo favorito
        const favorite = new Favorite({
            id_user,
            id_movie
        });

        await favorite.save();

        console.log(`Película ${id_movie} agregada a favoritos del usuario ${id_user}`);

        return res.status(201).json({
            success: true,
            message: 'Película agregada a favoritos',
            data: favorite
        });

    } catch (error) {
        console.error('Error al agregar a favoritos:', error);
        return res.status(500).json({
            success: false,
            message: `Error al agregar a favoritos: ${error.message}`
        });
    }
};

export const getFavoriteMovies = async (req, res) => {
    try {
        const { id_user } = req.params;

        if (!id_user) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el ID del usuario'
            });
        }

        const favorites = await Favorite.find({ id_user }).lean();

        console.log('Favoritos encontrados:', favorites);

        if (!favorites || favorites.length === 0) {
            return res.status(200).json([]);
        }

        const movieIds = favorites.map(fav => fav.id_movie);

        const movies = await Movie.find({ id: { $in: movieIds } }).lean();

        console.log(`📋 Se encontraron ${movies.length} películas favoritas para el usuario ${id_user}`);

        return res.status(200).json(movies);

    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        return res.status(500).json({
            success: false,
            message: `Error al obtener favoritos: ${error.message}`
        });
    }
};

export const deleteFromFavorites = async (req, res) => {
    try {
        const { id_user, id_movie } = req.body;

        if (!id_user || !id_movie) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere id_user y id_movie'
            });
        }

        const existingFavorite = await Favorite.findOne({ id_user, id_movie });
        if (!existingFavorite) {
            return res.status(404).json({
                success: false,
                message: 'La película no está en favoritos'
            });
        }

        await Favorite.findOneAndDelete({ id_user, id_movie });

        console.log(`Película ${id_movie} eliminada de favoritos del usuario ${id_user}`);

        return res.status(200).json({
            success: true,
            message: 'Película eliminada de favoritos'
        });

    } catch (error) {
        console.error('Error al eliminar de favoritos:', error);
        return res.status(500).json({
            success: false,
            message: `Error al eliminar de favoritos: ${error.message}`
        });
    }
};

export const searchMovies = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere un título para buscar'
            });
        }

        // Buscar en la base de datos local usando una expresión regular
        const movies = await Movie.find({
            title: { $regex: title, $options: 'i' }
        }).limit(20);

        if (!movies.length) {
            return res.status(200).json({
                success: true,
                message: 'No se encontraron películas',
                data: []
            });
        }

        console.log(`🔍 Se encontraron ${movies.length} películas para la búsqueda: "${title}"`);

        return res.status(200).json({
            success: true,
            data: movies,
            total: movies.length
        });

    } catch (error) {
        console.error('Error en la búsqueda de películas:', error);
        return res.status(500).json({
            success: false,
            message: `Error en la búsqueda: ${error.message}`
        });
    }
};

