import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'ecommerce';
const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        if (!dbURI) {
            throw new Error("La URI de la base de datos no está configurada en el archivo .env");
        }

        await mongoose.connect(dbURI.replace('<dbName>', dbName), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Conectado a la base de datos MongoDB en ${dbURI}, Base de datos: ${dbName}`);
    } catch (error) {
        console.error("Hubo un error al conectarse a la base de datos de MongoDB:", error.message);
        process.exit(1); // Terminar la aplicación si no se puede conectar a la base de datos
    }
};

export default connectDB;
