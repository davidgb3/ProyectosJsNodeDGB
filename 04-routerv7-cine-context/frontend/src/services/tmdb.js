const apiToken = import.meta.env.VITE_API_TOKEN;
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlImages= import.meta.env.VITE_API_URL_IMAGES;
const VITE_MONGODB_URL = import.meta.env.VITE_MONGODB_URL;
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

const fetchFromApi = async (endpoint,options={}) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiToken}&language=es-ES&${new URLSearchParams(options)}`);
        if(!response.ok){
            throw new Error("Error en fetchFromApi");
        }
        return await response.json();
    } catch (error) {
        console.error("Error: ",error);
    }
}


export const getPopularMovies = async (page=1) => {
    return fetchFromApi("movie/popular",{page});
};

export const getMovieDetails = async (id) => {
    return fetchFromApi(`movie/${id}`);
};

export const searchMovies = async (title) => {
    try {
        const response = await fetch(`${VITE_MONGODB_URL}/movies/search/${title}`);
        if(!response.ok){
            throw new Error("Error al buscar la película");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        throw new Error("Error al buscar la película: " + error.message);
    }
};

export const getMovieVideos = async (id) => {
    return fetchFromApi(`movie/${id}/videos`);
};

export const getMovies = async (page) => {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/movieList?page=${page}&limit=50`);
        if(!response.ok){
            throw new Error("Error al obtener las peliculas de la BD");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error al obtener las peliculas de la BD", error.message);
    }
};

