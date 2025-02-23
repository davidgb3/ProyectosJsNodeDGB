// app.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Obtener la ruta absoluta de la carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de la carpeta "uploads"
const uploadsDir = path.join(__dirname, "uploads");
const recycledDir = path.join(__dirname, "recycle");

// Verificar si la carpeta "uploads" existe, si no, crearla
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Carpeta "${uploadsDir}" creada exitosamente.`);
} else {
  console.log(`Carpeta "${uploadsDir}" ya existe.`);
}

// Verificar si la carpeta "recycle" existe, si no, crearla
if (!fs.existsSync(recycledDir)) {
  fs.mkdirSync(recycledDir, { recursive: true });
  console.log(`Carpeta "${recycledDir}" creada exitosamente.`);
} else {
  console.log(`Carpeta "${recycledDir}" ya existe.`);
}

// Servir archivos estáticos (como el HTML)
app.use(express.static(path.join(__dirname, "public")));

// Usar las rutas para manejar uploads/files
app.use("/api", uploadRoutes);

// Configuramos el puerto donde va a escuchar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
