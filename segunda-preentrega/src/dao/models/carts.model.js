import mongoose from "mongoose";

// Nombre de la colección en la base de datos
const cartsCollection = "carts";

// Definición del esquema para los carritos
const cartsSchema = new mongoose.Schema({
  products: [{
    // Referencia al ID del producto en la colección "products"
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    // Cantidad del producto en el carrito
    quantity: Number
  }]
}, {
  // Opciones del esquema
  timestamps: true // Añade campos "createdAt" y "updatedAt" automáticamente
});

// Modelo de Mongoose para la colección de carritos
const Cart = mongoose.model(cartsCollection, cartsSchema);

// Exportar el modelo para su uso en otros archivos
export default Cart;
