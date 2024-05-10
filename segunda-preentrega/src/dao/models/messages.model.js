import mongoose from "mongoose";

// Nombre de la colección en la base de datos
const collection = "messages";

// Definición del esquema para los mensajes
const messageSchema = new mongoose.Schema({
    // Nombre de usuario del remitente del mensaje
    user: {
        type: String,
        required: true // El nombre de usuario del remitente es obligatorio
    },
    // Contenido del mensaje
    message: {
        type: String,
        required: true // El contenido del mensaje es obligatorio
    }
},
// Opciones del esquema
{ timestamps: true } // Añade campos "createdAt" y "updatedAt" automáticamente
);

// Modelo de Mongoose para la colección de mensajes
const messageModel = mongoose.model(collection, messageSchema);

// Exportar el modelo para su uso en otros archivos
export default messageModel;
