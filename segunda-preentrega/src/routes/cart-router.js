import { Router } from "express";
import CartManager from "../dao/cartManagerMONGO.js";
import ProductManager from "../dao/productManagerMONGO.js";
import { isValidObjectId } from "mongoose";

export const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const response = await cartManager.getAllCarts();
    res.json(response);
  } catch (error) {
    console.error("Error al intentar obtener todos los carritos:", error);
    res.status(500).send("Error al intentar obtener todos los carritos");
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    if (!isValidObjectId(cid)) {
      return res.status(400).json({ error: `ID de carrito no válido: ${cid}` });
    }
    const carrito = await cartManager.getOneByPopulate({ _id: cid });
    if (!carrito) {
      return res.status(404).json({ error: `Carrito no encontrado con ID: ${cid}` });
    }
    res.status(200).json({ carrito });
  } catch (error) {
    console.error("Error al intentar obtener el carrito por ID:", error);
    res.status(500).send("Error al intentar obtener el carrito por ID");
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error("Error al intentar crear un nuevo carrito:", error);
    res.status(500).send("Error al intentar crear un nuevo carrito");
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      return res.status(400).json({ error: `IDs de carrito o producto no válidos` });
    }
    const carrito = await cartManager.getOneBy({ _id: cid });
    const producto = await productManager.getOneBy({ _id: pid });
    if (!carrito || !producto) {
      return res.status(404).json({ error: `Carrito o producto no encontrado` });
    }
    await cartManager.addProductToCart(cid, pid);
    res.status(200).json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    console.error("Error al intentar agregar producto al carrito:", error);
    res.status(500).send("Error al intentar agregar producto al carrito");
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      return res.status(400).json({ error: `IDs de carrito o producto no válidos` });
    }
    await cartManager.decreaseProductQuantity(cid, pid);
    res.status(200).json({ message: `Se redujo la cantidad del producto en el carrito` });
  } catch (error) {
    console.error("Error al intentar disminuir la cantidad del producto en el carrito:", error);
    res.status(500).send("Error al intentar disminuir la cantidad del producto en el carrito");
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    if (!isValidObjectId(cid)) {
      return res.status(400).json({ error: `ID de carrito no válido: ${cid}` });
    }
    await cartManager.deleteCartById(cid);
    res.status(200).json({ message: `Carrito con ID: ${cid} eliminado exitosamente` });
  } catch (error) {
    console.error("Error al intentar eliminar el carrito por ID:", error);
    res.status(500).send("Error al intentar eliminar el carrito por ID");
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      return res.status(400).json({ error: `IDs de carrito o producto no válidos` });
    }
    await cartManager.deleteProductFromCart(cid, pid);
    res.status(200).json({ message: `Producto con ID: ${pid} eliminado del carrito exitosamente` });
  } catch (error) {
    console.error("Error al intentar eliminar el producto del carrito por ID:", error);
    res.status(500).send("Error al intentar eliminar el producto del carrito por ID");
  }
});

router.put("/:cId/products/:pId", async (req, res) => {
  const { cId, pId } = req.params;
  try {
    if (!isValidObjectId(cId) || !isValidObjectId(pId)) {
      return res.status(400).json({ error: `IDs de carrito o producto no válidos` });
    }
    let carrito = await cartManager.getOneBy({ _id: cId });
    if (!carrito) {
      return res.status(404).json({ error: `Carrito no encontrado con ID: ${cId}` });
    }
    const productIndex = carrito.products.findIndex(p => p.product == pId);
    if (productIndex === -1) {
      return res.status(404).json({ error: `El producto con ID ${pId} no está en el carrito` });
    }
    const { quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ error: `La cantidad debe ser mayor que cero` });
    }
    carrito.products[productIndex].quantity = quantity;
    const resultado = await cartManager.update(cId, carrito);
    if (resultado.modifiedCount > 0) {
      res.status(200).json({ message: "Producto en el carrito actualizado exitosamente" });
    } else {
      res.status(500).json({
        error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
        detalle: `No se pudo realizar la actualización del producto en el carrito`,
      });
    }
  } catch (error) {
    console.error("Error al intentar modificar la cantidad del producto en el carrito:", error);
    res.status(500).send("Error al intentar modificar la cantidad del producto en el carrito");
  }
});
