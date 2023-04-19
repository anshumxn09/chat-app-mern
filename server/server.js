require('dotenv').config({path : "./config/config.env"});
const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const port = process.env.PORT || 8000
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message : "God is GREAT!!"
    })
})

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', () => {
    console.log("New Connection");
})

server.listen(port, () => {
    console.log("successfully running");
})