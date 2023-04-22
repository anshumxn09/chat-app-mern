require('dotenv').config({path : "./config/config.env"});
const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message : "God is GREAT!!"
    })
})
let users = [{}];

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {

    socket.on("joined", ({user}) => {
        users[socket.id] = user;
        socket.broadcast.emit("userJoined", {user : "Admin", message : `${users[socket.id]} has joined the chat`});

        socket.emit('welcome', {user : "Admin", message : `Welcome to the CHAT ${users[socket.id]}`});
    })

    socket.on("disconnected", () => {
        socket.broadcast.emit("left", {user : "Admin", message : `${users
        [socket.id]} has left the chat`});
    })

    socket.on("message", ({message, id}) => {
        io.emit("sendMessage", {
            user : users[id],
            message, id
        })
    })
})

server.listen(port, () => {
    console.log("successfully running");
})