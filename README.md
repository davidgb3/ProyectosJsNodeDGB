# ProyectosJsNodeDGB
Proyectos JavaScript y Node.js

## 1. Upload Data Project

### Tecnologías
- Node.js
- Express 
- Multer
- Chart.js
- Tailwind CSS

### Iniciar proyecto

bash
en la raiz del proyecto ejecutar: docker-compose up --build

### Puertos y rutas
- Frontend: http://localhost:3000

#### API Endpoints:
- POST `/api/upload`: Subir archivos
- GET `/api/files`: Listar archivos  
- GET `/api/recycle`: Listar archivos reciclados
- DELETE `/api/:filename`: Eliminar archivo

## 2. Pokémon App

### Tecnologías

#### Frontend
- React 18
- Vite
- React Router DOM 7
- Tailwind CSS
- Sonner

#### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Iniciar proyecto

bash
en la raiz del proyecto ejecutar: docker-compose up --build

### Puertos y rutas
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- MongoDB: mongodb://localhost:27017

#### API Endpoints:
- GET `/api/start`: Inicializar base de datos
- GET `/api/pokemonList`: Listar pokémons
- GET `/api/pokemonSearch/:name`: Buscar pokémon
- POST `/api/favorites`: Añadir a favoritos
- GET `/api/favorites`: Listar favoritos
- DELETE `/api/favorites/:id`: Eliminar de favoritos

## 3. Movie App

### Tecnologías

#### Frontend
- React 18
- Vite
- React Router DOM 7
- Tailwind CSS
- React Spinners
- Heroicons

#### Backend
- Node.js
- Express
- MongoDB
- JWT
- Bcrypt
- Cookie Parser

### Iniciar proyecto

bash
docker-compose up --build

### Puertos y rutas
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MongoDB: mongodb://localhost:27017
- Mongo Express: http://localhost:8081
  - Usuario: admin
  - Contraseña: hlanz

#### API Endpoints

##### Autenticación:
- POST `/api/auth/register`: Registro
- POST `/api/auth/login`: Login
- POST `/api/auth/logout`: Logout
- GET `/api/auth/session`: Verificar sesión

##### Películas:
- GET `/api/movies/movieList`: Listar películas
- GET `/api/movies/search`: Buscar películas
- POST `/api/movies/favorites`: Añadir a favoritos
- GET `/api/movies/favorites`: Listar favoritos
- DELETE `/api/movies/favorites/:id`: Eliminar de favoritos

#### Fallos:
- Reviews y Search están no operativos.
- Cuando se inicia sesión y te reedirige a mivieList, hace falta recargar la pagina para que haga el loginCheck y ya se puedan añadir películas a favoritos.
