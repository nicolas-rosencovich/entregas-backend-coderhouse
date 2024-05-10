import { cartsModel } from "../dao/models/carts.model.js";

export default class CartManager {
    ID_FIELD = "_id";

    // Método para crear un nuevo carrito
    async createCart() {
        try {
            // Crear un nuevo carrito vacío en la base de datos
            const cart = await cartsModel.create({ products: [] });
            // Convertir el carrito a formato JSON y devolverlo
            return cart.toJSON();
        } catch (error) {
            // Manejar errores si ocurre algún problema al crear el carrito
            console.error("Error al crear el carrito:", error);
            return false;
        }
    }

    // Método para obtener todos los carritos
    async getAllCarts() {
        try {
            // Obtener todos los carritos de la base de datos y convertirlos a objetos JavaScript
            const carts = await cartsModel.find().lean();
            // Devolver los carritos obtenidos
            return carts;
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener los carritos
            console.error("Error al obtener todos los carritos:", error);
            return [];
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(id) {
        try {
            // Buscar un carrito por su ID en la base de datos y obtener sus productos poblados
            return await cartsModel.findOne({ _id: id }).populate("products.product").lean();
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener el carrito por su ID
            console.error("Error al obtener el carrito por ID:", error);
            return null;
        }
    }

    // Método para obtener un carrito por un filtro dado
    async getOneBy(filtro = {}) {
        try {
            // Buscar un carrito por un filtro dado en la base de datos
            return await cartsModel.findOne(filtro).lean();
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener el carrito por el filtro dado
            console.error("Error al obtener el carrito por filtro:", error);
            return null;
        }
    }

    // Método para eliminar un carrito por su ID
    async deleteCartById(id) {
        try {
            // Eliminar un carrito por su ID de la base de datos
            return await cartsModel.findByIdAndDelete({ [this.ID_FIELD]: id });
        } catch (error) {
            // Manejar errores si ocurre algún problema al eliminar el carrito por su ID
            console.error("Error al eliminar el carrito por ID:", error);
            return false;
        }
    }

    // Método para actualizar un carrito por su ID
    async update(id, carrito) {
        try {
            // Actualizar un carrito por su ID en la base de datos
            return await cartsModel.updateOne({ _id: id }, carrito);
        } catch (error) {
            // Manejar errores si ocurre algún problema al actualizar el carrito
            console.error("Error al actualizar el carrito:", error);
            return false;
        }
    }

    // Método para obtener un carrito por un filtro dado con los productos poblados
    async getOneByPopulate(filtro = {}) {
        try {
            // Buscar un carrito por un filtro dado en la base de datos y obtener sus productos poblados
            return await cartsModel.findOne(filtro).populate("products.product").lean();
        } catch (error) {
            // Manejar errores si ocurre algún problema al obtener el carrito por el filtro dado con poblado
            console.error("Error al obtener el carrito por filtro con poblado:", error);
            return null;
        }
    }

    // Método para eliminar un producto de un carrito por su ID de carrito y su ID de producto
    async deleteProductFromCart(id, productId) {
        try {
            // Buscar el carrito por su ID en la base de datos
            const cart = await cartsModel.findById(id);
            // Eliminar el producto del carrito por su ID de producto
            cart.products.remove(productId);
            // Guardar los cambios en el carrito
            await cart.save();
            return true;
        } catch (error) {
            // Manejar errores si ocurre algún problema al eliminar el producto del carrito
            console.error("Error al eliminar el producto del carrito:", error);
            return false;
        }
    }

    // Método para disminuir la cantidad de un producto en un carrito por su ID de carrito y su ID de producto
    async decreaseProductQuantity(cid, pid) {
        try {
            // Buscar el carrito por su ID en la base de datos
            const cart = await cartsModel.findById(cid);
            // Buscar el índice del producto en la lista de productos del carrito por su ID de producto
            const productIndex = cart.products.findIndex(product => product.product == pid);

            // Verificar si se encontró el producto en el carrito
            if (productIndex !== -1) {
                // Verificar si la cantidad del producto es mayor que 1
                if (cart.products[productIndex].quantity > 1) {
                    // Disminuir la cantidad del producto en 1
                    cart.products[productIndex].quantity -= 1;
                } else {
                    // Eliminar el producto del carrito si la cantidad es 1
                    cart.products.splice(productIndex, 1);
                }
                // Guardar los cambios en el carrito
                await cart.save();
            }
            return true;
        } catch (error) {
            // Manejar errores si ocurre algún problema al disminuir la cantidad del producto en el carrito
            console.error("Error al disminuir la cantidad del producto en el carrito:", error);
            return false;
        }
    }
}
