const socketClient = io();
const nombreUsuario = document.getElementById("name-user");
const formulario = document.getElementById("formulario");
const inputmensaje = document.getElementById("mensaje");
const chat = document.getElementById("chat");

let usuario = null;

function mostrarMensajeDeBienvenida() {
    Swal.fire({
        title: "Bienvenido al servicio de mensajería",
        text: "Ingresa tu usuario",
        input: "text",
        inputValidator: (value) => {
            if (!value) {
                return "Necesitas ingresar tu usuario";
            }
        },
    }).then((result) => {
        usuario = result.value;
        nombreUsuario.innerHTML = usuario;
        socketClient.emit("nuevousuario", usuario);
    });
}

function enviarMensaje(e) {
    e.preventDefault();
    const mensaje = inputmensaje.value.trim();
    if (mensaje) {
        socketClient.emit("mensaje", { user: usuario, message: mensaje });
        inputmensaje.value = "";
        scrollToBottom();
    }
}

function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight;
}

formulario.addEventListener("submit", enviarMensaje);

socketClient.on("chat", (mensajes) => {
    const chatRender = mensajes
        .map((mensaje) => {
            const fechaCreacion = new Date(mensaje.createdAt);
            const horaFormateada = fechaCreacion.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
            });
            return `<p class="message-container"><strong>${horaFormateada}</strong> - <strong>${mensaje.user}</strong>: ${mensaje.message}</p>`;
        })
        .join("");
    chat.innerHTML = chatRender;
});

socketClient.on("broadcast", (usuario) => {
    Toastify({
        text: `Ingreso ${usuario} al chat`,
        duration: 5000,
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
});

document.getElementById("clearChat").addEventListener("click", () => {
    chat.textContent = "";
    socketClient.emit("clearchat");
});

// Mostrar mensaje de bienvenida al cargar la página
if (!usuario) {
    mostrarMensajeDeBienvenida();
}
