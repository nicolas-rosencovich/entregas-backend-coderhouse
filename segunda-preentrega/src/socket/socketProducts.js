import ProductManager from "../dao/productManagerMONGO.js";

const productManager = new ProductManager();

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        try {
            const listOfProducts = await productManager.getProducts();
            socketServer.emit('sendProducts', listOfProducts);

            socket.on("addProduct", async (obj) => {
                try {
                    await productManager.addProduct(obj);
                    const updatedProducts = await productManager.getProducts();
                    socketServer.emit('sendProducts', updatedProducts);
                } catch (error) {
                    console.error("Error adding product:", error);
                }
            });

            socket.on("deleteProduct", async (id) => {
                console.log("Received event to delete product with ID:", id);
                try {
                    await productManager.deleteProductById(id);
                    const updatedProducts = await productManager.getProducts();
                    socketServer.emit('sendProducts', updatedProducts);
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
            });
        } catch (error) {
            console.error("Error getting the list of products:", error);
        }
    });
};

export default socketProducts;
