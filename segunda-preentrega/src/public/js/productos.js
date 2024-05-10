const comprar = async (pid) => {
    try {
        const inputCarrito = document.getElementById("inputCarrito");
        const cid = inputCarrito.value;
        console.log(`Código producto: ${pid}, Código Carrito: ${cid}`);

        const respuesta = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: "POST"
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            console.log(datos);
            alert("Producto agregado correctamente.");
        } else {
            throw new Error("Error al agregar el producto al carrito.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        alert("Ocurrió un error al intentar agregar el producto al carrito.");
    }
};
