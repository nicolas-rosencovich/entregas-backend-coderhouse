import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
    constructor() {
        this.PATH = "./src/data/products.json";
    }

    // Método para agregar un nuevo producto
    async addProduct({ title, description, price, thumbnail, code, stock, status, category }) {
        try {
            // Generar un nuevo ID único para el producto
            const id = uuidv4();
            // Crear un nuevo objeto de producto con los datos proporcionados
            const newProduct = { id, title, description, price, thumbnail, code, stock, status, category };
            // Obtener la lista de productos actual
            const products = await this.getProducts();
            // Agregar el nuevo producto a la lista de productos
            products.push(newProduct);
            // Escribir la lista actualizada de productos en el archivo
            await fs.promises.writeFile(this.PATH, JSON.stringify(products));
            // Devolver el nuevo producto
            return newProduct;
        } catch (error) {
            // Manejar errores si ocurre algún problema al agregar el producto
            console.error("Error al agregar el producto:", error);
            return false;
        }
    }

    // Método para obtener todos los productos
    async getProducts() {
        try {
            // Leer el archivo de productos y devolver la lista de productos
            const response = await fs.promises.readFile(this.PATH, "utf-8");
            return JSON.parse(response);
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener los productos
            console.error("Error al obtener los productos:", error);
            return [];
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(id) {
        try {
            // Obtener la lista de productos
            const products = await this.getProducts();
            // Buscar el producto con el ID proporcionado
            return products.find(product => product.id === id);
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener el producto por su ID
            console.error("Error al obtener el producto por ID:", error);
            return null;
        }
    }

    // Método para actualizar un producto por su ID con nuevos datos
    async updateProduct(id, newData) {
        try {
            // Obtener la lista de productos
            const products = await this.getProducts();
            // Encontrar el índice del producto con el ID proporcionado
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                // Actualizar los datos del producto con los nuevos datos proporcionados
                products[index] = { ...products[index], ...newData };
                // Escribir la lista actualizada de productos en el archivo
                await fs.promises.writeFile(this.PATH, JSON.stringify(products));
                console.log("Producto actualizado correctamente.");
                return true;
            } else {
                console.log("El producto no existe.");
                return false;
            }
        } catch (error) {
            // Manejar errores si ocurre algún problema al actualizar el producto
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProductById(id) {
        try {
            // Obtener la lista de productos
            let products = await this.getProducts();
            // Filtrar los productos para excluir el producto con el ID proporcionado
            products = products.filter(product => product.id !== id);
            // Escribir la lista actualizada de productos en el archivo
            await fs.promises.writeFile(this.PATH, JSON.stringify(products));
            console.log("Producto eliminado correctamente.");
            return true;
        } catch (error) {
            // Manejar errores si ocurre algún problema al eliminar el producto por su ID
            console.error("Error al eliminar el producto por ID:", error);
            return false;
        }
    }
}
