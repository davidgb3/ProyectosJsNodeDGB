import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import PokemonRoutes from './routes/PokemonRoutes.js';
import connectDB from './config/db.js';
import { dataInyection } from './controllers/PokemonController.js';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const allowOrigins = ['http://localhost:5173']

app.use(cors({
    origin: allowOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(express.json());

// Connect to DB
await connectDB();

const checkAndInjectData = async () => {
  try {
    const collection = await mongoose.connection.collection('pokemons');
    const count = await collection.countDocuments();
    if (count === 0) {
      await dataInyection();
    }
  } catch (error) {
    throw new Error('Error al verificar y cargar datos:', error.message);
  }
};  

await checkAndInjectData();
// Middlewares

// Routes
app.use('/api', PokemonRoutes);

export default app;