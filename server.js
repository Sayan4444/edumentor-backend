const express = require('express');
const app = express();
const { createServer } = require('http')
const { Server } = require("socket.io")
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL
}
app.use(cors(corsOptions))

const server = createServer(app)

const io = new Server(server, {
    pingTimeout: 60 * 1000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

io.on('connection', (socket) => {
    socket.on("setup", (userId) => {
        socket.join(userId)
    })

    socket.on("send_message", (messageObj) => {
        const { chat, sender } = messageObj;
        chat.users.forEach((user) => {
            if (user._id === sender._id) return;
            socket.in(user._id).emit("receive_message", messageObj)
        })
    });

    // socket.off("setup", () => {
    //     socket.leave(userId);
    // });
})
const PORT = process.env.PORT;
server.listen(PORT, () => console.log('SERVER CREATED'))