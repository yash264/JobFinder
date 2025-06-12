// socket.js
const { Server } = require("socket.io");
const { fetchAllGroup, CreateGroup, SendMessage, fetchMessages } = require("./controller/Conversation.controller");

function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "https://jobfinder-meta.vercel.app",
            methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id);

        socket.on("joinGroup", (data) => {
            socket.join(data.groupName);
        });

        socket.on("leaveGroup", (data) => {
            socket.leave(data.groupName);
        });


        socket.on("getAllGroups", () => {
            fetchAllGroup(socket);
        });

        socket.on("createGroup", (data) => {
            CreateGroup(data, socket);
        });


        socket.on("getAllMessages", (data) => {
            fetchMessages(socket, data);
        });

        socket.on("sendMessage", (data) => {
            SendMessage(data, socket);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
}

module.exports = initSocket;
