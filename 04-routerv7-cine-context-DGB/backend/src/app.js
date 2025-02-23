// src/index.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import cookieParser from "cookie-parser";
import { fetchFromApi, getPopularMovies } from "./controllers/movieController.js";

// Cargamos las variables de entorno
dotenv.config();
// Creamos la app
const app = express();

// Middlewares para parsear el body y cors
app.use(cors({
  origin: "http://localhost:5173", // URL del frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Error handling middleware para manejar errores de rutas no encontradas y errores de servidor 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "¡Ups! Algo salió mal!" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});

await getPopularMovies();
