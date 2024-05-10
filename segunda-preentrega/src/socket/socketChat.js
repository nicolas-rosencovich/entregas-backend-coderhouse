import MessageManager from "../dao/messageManagerMONGO.js";

const messageManager = new MessageManager();

const socketChat = (socketServer) => {
    socketServer.on('connection', async (socket) => {
        socket.on("mensaje", async (info) => {
            try {
                await messageManager.createMessage(info);
                const messages = await messageManager.getMessages();
                socketServer.emit("chat", messages);
            } catch (error) {
                console.error("Error sending and saving message:", error);
            }
        });

        socket.on("clearchat", async () => {
            try {
                await messageManager.deleteMessage();
                socketServer.emit("chatCleared");
            } catch (error) {
                console.error("Error clearing chat:", error);
            }
        });

        socket.on("nuevousuario", (usuario) => {
            socket.broadcast.emit("broadcast", usuario);
        });
    });
};

export default socketChat;
