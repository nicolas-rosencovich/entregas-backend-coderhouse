// Función para agregar un producto
const agregarProducto = (event) => {
    event.preventDefault();

    // Obtener valores del formulario
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const stock = form.elements.stock.value;
    const thumbnail = form.elements.thumbnail.value;
    const category = form.elements.category.value;
    const price = form.elements.price.value;
    const code = form.elements.code.value;
    const status = form.elements.status.checked;

    // Validar datos (por ejemplo, verificar que los campos obligatorios estén completos)

    // Enviar solicitud al servidor para agregar el producto
    socketClient.emit("addProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,
        status
    });

    // Limpiar el formulario después de enviar
    form.reset();
};

// Función para eliminar un producto por ID
const eliminarProducto = () => {
    const id = document.getElementById("id-prod").value.toString();
    socketClient.emit("deleteProduct", id);
};

// Función para actualizar un producto por ID
const actualizarProducto = () => {
    const id = document.getElementById("id-prod").value.toString();
    const updatedProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        stock: document.getElementById("stock").value,
        thumbnail: document.getElementById("thumbnail").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        status: document.getElementById("status").checked
    };
    socketClient.emit("updateProduct", { id, updatedProduct });
};

// Asignar eventos a los botones del formulario
document.getElementById("formProduct").addEventListener("submit", agregarProducto);
document.getElementById("delete-id-btn").addEventListener("click", eliminarProducto);
// document.getElementById("update-id-btn").addEventListener("click", actualizarProducto); // Descomenta para habilitar la funcionalidad de actualización
