import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'; // Importación de la funcionalidad de paginación

// Definición del esquema para los productos
const productsSchema = new mongoose.Schema({
    // Título del producto
    title: {
        type: String,
        required: true // El título del producto es obligatorio
    },
    // Descripción del producto
    description: {
        type: String,
        required: true // La descripción del producto es obligatoria
    },
    // Precio del producto
    price: {
        type: Number,
        required: true // El precio del producto es obligatorio
    },
    // Stock del producto
    stock: {
        type: Number,
        required: true // El stock del producto es obligatorio
    },
    // URL de la imagen del producto
    thumbnail: {
        type: String,
        required: false // El campo no es obligatorio
    },
    // Código único del producto
    code: {
        type: String,
        unique: true, // Se asegura de que el código sea único
        required: true // El código del producto es obligatorio
    },
    // Categoría del producto
    category: {
        type: String,
        required: true // La categoría del producto es obligatoria
    },
    // Estado del producto (activo/inactivo)
    status: {
        type: Boolean,
        default: true // Establece true por defecto
    }
});

// Se añade la funcionalidad de paginación al esquema
productsSchema.plugin(paginate);

// Modelo de Mongoose para la colección de productos
export const productsModel = mongoose.model("products", productsSchema);
