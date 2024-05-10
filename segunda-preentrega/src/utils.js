import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

// Obteniendo la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Exportando la ruta del directorio actual
export default __dirname;

// Configuración de multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        let tipo = file.mimetype.split("/")[0]
        if (tipo !== "image") {
            return cb(new Error("Solo se admiten imágenes...!"))
        } 
        cb(null, Date.now() + "-" + file.originalname )
    }
})

// Exportando el middleware de multer para subida de archivos
export const upload = multer({ storage: storage });
