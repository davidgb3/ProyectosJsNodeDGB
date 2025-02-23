import express from 'express';
import { pokemonList, dataInyection, pokemonSearch, addToFavorites, getFavorites, deleteFavorite } from '../controllers/PokemonController.js';

const router = express.Router();

router.get('/start', dataInyection);
router.get('/pokemons', pokemonList);
router.get('/pokemonSearch/:name', pokemonSearch);
router.post('/addFavorite/:id', addToFavorites);
router.get('/favorites', getFavorites);
router.delete('/deleteFavorite/:id', deleteFavorite);

export default router;
