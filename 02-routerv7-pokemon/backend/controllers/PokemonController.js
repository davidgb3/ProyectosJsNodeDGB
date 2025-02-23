import apiFetch from '../helpers/ApiFetch.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const apiUrl = process.env.POKE_API_URL;
const url = process.env.MONGODB_URI;

const getPokemons = async () => {
    try {
        let data = await apiFetch(apiUrl);
        let pokemons = [];

        while (data.next) {
            const newPokemons = await Promise.all(
                data.results.map(async (pokemon) => {
                    const repo = await fetch(pokemon.url);
                    if (!repo.ok) {
                        throw new Error("Something went wrong");
                    }
                    const repoData = await repo.json();
                    return repoData;
                })
            );
            pokemons = pokemons.concat(newPokemons);
            data = await apiFetch(data.next);
        }

        console.log('Pokemons obtenidos:', pokemons.length);
        return pokemons;
    } catch (error) {
        console.error('Error al obtener los datos', error);
        return [];
    }
};

export const dataInyection = async () => {
    try {
        const pokemons = await getPokemons();

        if (!Array.isArray(pokemons) || pokemons.length === 0) {
            throw new Error('Los datos recibidos no son un array válido');
        }

        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const collection = mongoose.connection.collection('pokemons');
        const resultado = await collection.insertMany(pokemons);
        console.log('Personajes insertados:', resultado.insertedCount);
        return resultado;
    } catch (error) {
        console.error('Error al insertar múltiples:', error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
};

export const pokemonList = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const collection = mongoose.connection.collection('pokemons');
        const pokemons = await collection.find({})
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .toArray();
        res.status(200).json(pokemons);
    } catch (error) {
        console.error('Error al obtener los pokemons:', error);
        res.status(500).json({ error: 'Error al obtener los pokemons' });
    } finally {
        await mongoose.connection.close();
    }
};

export const pokemonSearch = async (req, res) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const collection = mongoose.connection.collection('pokemons');
        const character = await collection.findOne({ name: req.params.name.toLowerCase().trim() });
        if (!character) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles del personaje' });
    } finally {
        await mongoose.connection.close();
    }
};

export const addToFavorites = async (req, res) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const collection = mongoose.connection.collection('pokemons');
        const pokemon = await collection.findOne({ id: parseInt(req.params.id) });
        const favorites = mongoose.connection.collection('favorites');
        if (!pokemon) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        const result = await favorites.insertOne(pokemon);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al añadir a favoritos:', error);
        res.status(500).json({ error: 'Error al añadir a favoritos' });
    }
};

export const getFavorites = async (req, res) => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const favorites = mongoose.connection.collection('favorites');
        const pokemons = await favorites.find().toArray();
        if(pokemons.length === 0){
            return res.status(404).json({ error: 'No hay favoritos' });
        }
        res.status(200).json(pokemons);
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
};

export const deleteFavorite = async (req, res) => {
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const favorites = mongoose.connection.collection('favorites');
        const result = await favorites.deleteOne({ id: parseInt(req.params.id) });
        if(result.deletedCount === 0){
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al eliminar de favoritos:', error);
        res.status(500).json({ error: 'Error al eliminar de favoritos' });
    }
};
