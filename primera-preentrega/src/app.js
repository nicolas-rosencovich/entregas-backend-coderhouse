import express from 'express';
import { ProductManager } from './productManager.js';
import {productsRouter} from "./routes/products.router.js"
import{cartManager}from "./dao/cartManager.js"
const PORT=8080;

const app=express();

export const productManager = new ProductManager;
export const cartManager = new cartManager;

app.use("/api/products", productsRouter)//localhost:8080



//para que no se rompa cuando reciba un JSON
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
