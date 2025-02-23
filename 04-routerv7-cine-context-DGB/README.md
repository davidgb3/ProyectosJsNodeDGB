# 🎬 Movie App

## 🛠 Tecnologías Utilizadas

### Frontend
- **React** (v18.2.0)
- **Vite** (v5.0.0)
- **Tailwind CSS** (v3.3.0)
- **React Router DOM** (v6.20.0)
- **React Hot Toast** (v2.4.1)
- **React Spinners** (v0.13.8)

### Backend
- **Node.js** (v18.0.0)
- **Express** (v4.18.2)
- **MongoDB** (v6.0.0)
- **Mongoose** (v8.0.0)
- **JWT** (jsonwebtoken v9.0.0)
- **Bcrypt** (v5.1.1)
- **Cors** (v2.8.5)
- **Dotenv** (v16.3.1)

## 🌐 Puertos
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`
- **MongoDB**: `mongodb://localhost:27017`

## 🔐 Variables de Entorno

### Frontend (.env)

VITE_MONGODB_URL=http://localhost:3000/api
VITE_TMDB_API_KEY=your_tmdb_api_key

### Backend (.env)

PORT=3000
MONGODB_URI=mongodb://admin:hlanz@mongodb:27017/moviesDB?authSource=admin
JWT_SECRET=your_jwt_secret_key

API_TOKEN=a2a305b35416f6e75a83764427f0f096
API_URL="https://api.themoviedb.org/3/"
API_URL_IMAGES="https://image.tmdb.org/t/p/"

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/movie-app.git
cd 04-ROUTERV7-CINE-CONTEXT
docker compose up --build
```

## 📝 Notas Adicionales
- La aplicación utiliza la API de TMDB para obtener datos de películas
- Se requiere una cuenta en TMDB para obtener la API key
- La base de datos MongoDB debe estar en ejecución
- El backend utiliza cors para permitir peticiones del frontend
- El frontend se ejecuta en `http://localhost:5173`
- El backend se ejecuta en `http://localhost:3000`
- La base de datos MongoDB se ejecuta en `mongodb://localhost:27017`
- Las reviews y el buscar no estan implementados


