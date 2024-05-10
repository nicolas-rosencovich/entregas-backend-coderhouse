import { Router } from "express";
import ProductManagerMongo from "../dao/productManagerMONGO.js";

const productManager = new ProductManagerMongo();
export const router = Router();

router.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json({ products });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Error retrieving products" });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const productFind = await productManager.getProductById(req.params);
        res.json({ status: "success", productFind });
    } catch (error) {
        console.error("Error retrieving product by ID:", error);
        res.status(500).json({ error: "Error retrieving product by ID" });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const updatedProduct = await productManager.updateProduct(req.params, req.body);
        res.json({ status: "success", updatedProduct });
    } catch (error) {
        console.error("Error updating product by ID:", error);
        res.status(500).json({ error: "Error updating product by ID" });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const deleteProduct = await productManager.deleteProductById(id);
        res.json({ status: "success", deleteProduct });
    } catch (error) {
        console.error("Error deleting product by ID:", error);
        res.status(500).json({ error: "Error deleting product by ID" });
    }
});

router.post("/", async (req, res) => {
    try {
        let { title, ...otherProperties } = req.body;

        if (!title) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Title is required` });
        }

        let exists = await productManager.getOneBy({ title });

        if (exists) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Product with title ${title} already exists in the database` });
        }

        let newProduct = await productManager.create({ title, ...otherProperties });
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ newProduct });
    } catch (error) {
        console.error("Error creating new product:", error);
        res.status(500).json({ error: "Error creating new product" });
    }
});
