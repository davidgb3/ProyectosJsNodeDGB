# Usa la imagen oficial de Node.js
FROM node:23-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que corre el backend
EXPOSE 4000

# Comando para iniciar el backend
CMD ["npm", "start"]