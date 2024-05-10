import express from "express";
import path from "path"; 
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import connectDB from "./connection/MongoDB.js";
import dotenv from 'dotenv';
import { router as productRouter } from "./routes/products-router.js";
import { router as cartRouter } from "./routes/cart-router.js";
import { router as vistasRouter } from './routes/vistas.router.js';
import socketChat from "./socket/socketChat.js";
import socketProducts from './socket/socketProducts.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Conexión a MongoDB
connectDB();

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// Contenido estático
app.use(express.static(path.join(__dirname, '/public')));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', vistasRouter); // Ruta de las vistas con Handlebars
app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("Todo Ok");
});

// Escucha del servidor
const serverHTTP = app.listen(port, () => console.log(`Server corriendo en http://localhost:${port}`));
serverHTTP.on('error', (err) => console.log(err));

// Configuración de Socket.io
const socketServer = new Server(serverHTTP);
socketProducts(socketServer);
socketChat(socketServer);
