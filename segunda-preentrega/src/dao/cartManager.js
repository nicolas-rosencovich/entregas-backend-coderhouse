import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
    constructor() {
        // Ruta del archivo JSON donde se guardan los carritos
        this.PATH = "./src/data/cart.json";
        // Array para almacenar los carritos en memoria
        this.carts = [];
    }

    // Método para crear un nuevo carrito
    async newCart() {
        // Generar un ID único para el nuevo carrito
        const id = uuidv4();
        // Crear el objeto del nuevo carrito con el ID generado y una lista de productos vacía
        let newCart = { id, products: [] };

        // Obtener todos los carritos existentes
        this.carts = await this.getCarts();
        // Agregar el nuevo carrito al array de carritos
        this.carts.push(newCart);

        // Escribir el array actualizado de carritos en el archivo JSON
        await fs.promises.writeFile(this.PATH, JSON.stringify(this.carts));

        // Devolver el nuevo carrito creado
        return newCart;
    }

    // Método para obtener todos los carritos existentes
    async getCarts() {
        try {
            // Leer el archivo JSON y convertir su contenido a un objeto JavaScript
            const response = await fs.promises.readFile(this.PATH, 'utf-8');
            const responseParse = JSON.parse(response);
            // Devolver el array de carritos
            return responseParse;
        } catch (error) {
            // Manejar errores si ocurre algún problema al leer el archivo
            console.error("Error al leer los carritos:", error);
            return [];
        }
    }

    // Método para obtener los productos de un carrito específico
    async getCartProducts(id) {
        // Obtener todos los carritos
        const carts = await this.getCarts();
        // Buscar el carrito con el ID proporcionado
        const cart = carts.find(cart => cart.id === id);

        // Verificar si se encontró el carrito
        if (cart) {
            // Devolver la lista de productos del carrito encontrado
            return cart.products;
        } else {
            // Manejar el caso en que no se encuentre el carrito
            console.log("No se encontró el carrito");
            return [];
        }
    }

    // Método para agregar un producto a un carrito específico
    async addProductToCart(cartId, productId) {
        // Obtener todos los carritos
        const carts = await this.getCarts();
        // Buscar el índice del carrito con el ID proporcionado
        const findIndexCart = carts.findIndex(cart => cart.id === cartId);

        // Verificar si se encontró el carrito
        if (findIndexCart !== -1) {
            // Obtener los productos del carrito encontrado
            const cartProducts = await this.getCartProducts(cartId);
            // Buscar el índice del producto en la lista de productos del carrito
            const findIndexProductToSave = cartProducts.findIndex(product => product.id === productId);

            // Verificar si se encontró el producto en el carrito
            if (findIndexProductToSave !== -1) {
                // Incrementar la cantidad del producto si ya está en el carrito
                cartProducts[findIndexProductToSave].quantity++;
            } else {
                // Agregar el producto al carrito con una cantidad inicial de 1 si no está en el carrito
                cartProducts.push({ id: productId, quantity: 1 });
            }

            // Actualizar la lista de productos del carrito
            carts[findIndexCart].products = cartProducts;
            // Escribir el array actualizado de carritos en el archivo JSON
            await fs.promises.writeFile(this.PATH, JSON.stringify(carts));
            console.log("Producto agregado con éxito");
        } else {
            // Manejar el caso en que no se encuentre el carrito
            throw new Error("Carrito no encontrado, producto no agregado");
        }
    }

    // Método para disminuir la cantidad de un producto en un carrito específico
    async decreaseProductQuantity(cartId, productId) {
        try {
            // Obtener todos los carritos
            const carts = await this.getCarts();
            // Buscar el índice del carrito con el ID proporcionado
            const cartIndex = carts.findIndex(cart => cart.id === cartId);

            // Verificar si se encontró el carrito
            if (cartIndex !== -1) {
                // Obtener el carrito encontrado
                const cart = carts[cartIndex];
                // Buscar el índice del producto en la lista de productos del carrito
                const productIndex = cart.products.findIndex(product => product.id === productId);

                // Verificar si se encontró el producto en el carrito
                if (productIndex !== -1) {
                    // Verificar si la cantidad del producto es mayor que 1
                    if (cart.products[productIndex].quantity > 1) {
                        // Disminuir la cantidad del producto en 1
                        cart.products[productIndex].quantity--;
                    } else {
                        // Eliminar el producto del carrito si la cantidad es 1
                        cart.products.splice(productIndex, 1);
                    }

                    // Escribir el array actualizado de carritos en el archivo JSON
                    await fs.promises.writeFile(this.PATH, JSON.stringify(carts));
                    // Indicar que la operación se realizó con éxito
                    return true;
                }
            }

            // Devolver falso si no se encontró el carrito o el producto
            return false;
        } catch (error) {
            // Manejar errores si ocurre algún problema durante la operación
            console.error("Error al disminuir la cantidad del producto:", error);
            return false;
        }
    }
}

// Exportar la clase CartManager para su uso en otros archivos
export default CartManager;
