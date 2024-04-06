import express from 'express';
import { ProductManager } from './productManager.js';
import { CartManager } from './dao/cartManager.js'; // Asegúrate de tener la ruta correcta
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/cart.router.js";

const PORT = 8080;
const app = express();

export const productManager = new ProductManager();
export const cartManager = new CartManager(); // Exporta el cartManager correctamente

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});


