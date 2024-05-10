import { Router } from "express";
import ProductManagerMongo from "../dao/productManagerMONGO.js";

const productManager = new ProductManagerMongo();
export const router = Router();

router.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

router.get("/", async (req,res) => {
    const products = await productManager.getProducts();
    res.json({ products });
});

router.get("/:pid", async (req, res) => {
    const productFind = await productManager.getProductById(req.params);
    res.json({ status: "success", productFind });
});

router.put("/:pid", async (req, res) => {
    const updatedProduct = await productManager.updateProduct(req.params, req.body);
    res.json({ status: "success", updatedProduct });
});

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const deleteProduct = await productManager.deleteProductById(id);
    res.json({ status: "success", deleteProduct });
});

router.post("/", async(req, res) => {
    let { title, ...otherProperties } = req.body;

    if (!title) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Title is required` });
    }

    let exists;

    try {
        exists = await productManager.getOneBy({ title });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: `Unexpected server error - Try later, or contact your administrator`,
            detail: `${error.message}`
        });
    }

    if (exists) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Product with title ${title} already exists in the database` });
    }

    try {
        let newProduct = await productManager.create({ title, ...otherProperties });
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ newProduct });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: `Unexpected server error - Try later, or contact your administrator`,
            detail: `${error.message}`
        });
    }
});
