import { productsModel } from "./models/products.model.js";

export default class ProductManager {
    // Método para obtener todos los productos
    async getProducts() {
        try {
            // Utilizar el método find de Mongoose para obtener todos los productos de forma eficiente
            return await productsModel.find().lean();
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener los productos
            console.error("Error al obtener los productos:", error);
            throw error;
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(id) {
        try {
            // Utilizar el método findById de Mongoose para obtener un producto por su ID
            return await productsModel.findById(id).lean();
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener el producto por su ID
            console.error("Error al obtener el producto por ID:", error);
            throw error;
        }
    }

    // Método para obtener un producto por un filtro específico
    async getOneBy(filter = {}) {
        try {
            // Utilizar el método findOne de Mongoose para obtener un producto por un filtro específico
            return await productsModel.findOne(filter).lean();
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener el producto por filtro
            console.error("Error al obtener el producto por filtro:", error);
            throw error;
        }
    }

    // Método para crear un nuevo producto
    async create(product) {
        try {
            // Utilizar el método create de Mongoose para crear un nuevo producto
            return await productsModel.create(product);
        } catch (error) {
            // Manejar errores si ocurre algún problema al crear el producto
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }

    // Método para actualizar un producto por su ID
    async updateProduct(id, product) {
        try {
            // Utilizar el método findByIdAndUpdate de Mongoose para actualizar un producto por su ID
            return await productsModel.findByIdAndUpdate(id, product);
        } catch (error) {
            // Manejar errores si ocurre algún problema al actualizar el producto
            console.error("Error al actualizar el producto:", error);
            throw error;
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProductById(id) {
        try {
            // Utilizar el método findByIdAndDelete de Mongoose para eliminar un producto por su ID
            return await productsModel.findByIdAndDelete(id);
        } catch (error) {
            // Manejar errores si ocurre algún problema al eliminar el producto por su ID
            console.error("Error al eliminar el producto por ID:", error);
            throw error;
        }
    }

    // Método para obtener todos los productos de forma paginada
    async getAllPaginate(page = 1) {
        try {
            // Configurar las opciones de paginación
            const options = { limit: 5, page, lean: true };
            // Utilizar el método paginate de Mongoose para obtener los productos de forma paginada
            return await productsModel.paginate({}, options);
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener los productos paginados
            console.error("Error al obtener productos paginados:", error);
            throw error;
        }
    }

    // Método para obtener productos filtrados y paginados con clasificación
    async getProductsPaginate(filter, options) {
        try {
            // Obtener los productos paginados con los filtros y opciones proporcionados
            let result = await productsModel.paginate(filter, options);
            // Ordenar los productos según la clasificación especificada
            if (options.sort === "asc") {
                result.docs.sort((a, b) => a.price - b.price);
            } else if (options.sort === "desc") {
                result.docs.sort((a, b) => b.price - a.price);
            }
            return result;
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener los productos paginados con clasificación
            console.error("Error al obtener productos paginados con clasificación:", error);
            throw error;
        }
    }
}
