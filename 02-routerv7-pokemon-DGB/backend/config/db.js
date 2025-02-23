// aqui gestiono la conexión con la BD de MongoDB
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
// uso variables de entorno

dotenv.config();
const url = process.env.MONGODB_URI;

//función para conectar con la BD
const connectDB = async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB conectado');
    } catch (error) {
      console.error('Error de conexión:', error);
      process.exit(1);
    }
  };

export default connectDB;