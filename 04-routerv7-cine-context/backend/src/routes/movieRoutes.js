// src/routes/product.routes.js
import { Router } from "express";
import { addToFavorites, deleteFromFavorites, getFavoriteMovies, getPopularMovies, listMovies, searchMovies } from "../controllers/movieController.js";

const router = Router();

router.post('/start', getPopularMovies);
router.get('/movieList', listMovies);
router.post('/addFavorites', addToFavorites);
router.get('/favorites/:id_user', getFavoriteMovies);
router.delete('/deleteFromFavorites', deleteFromFavorites);
router.get('/search/:title', searchMovies);

export default router;
