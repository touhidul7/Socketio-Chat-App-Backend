const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Connection = require('./db.js');
const Chat = require('./models/Chat.js');

const app = express();
app.use(express.json());
Connection();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected");
    const loadMessages = async () => {
        try {
            const messages = await Chat.find().sort({ timeStamp: 1 }).exec();
            socket.emit('chat', messages);
        } catch (err) {
            console.error("Error loading messages:", err);
        }
    };
    loadMessages();

    socket.on('newMessage', async (msg) => {
        try {
            const newMessage = new Chat({
                username: msg.username,
                message: msg.message,
                avatar: msg.avatar,
                timeStamp: msg.timeStamp || Date.now(), // optional fallback
            });

            const savedMsg = await newMessage.save();

            // Emit the message back with tempId (for client to match and update status)
            io.emit('message', {
                _id: savedMsg._id, // optional
                username: savedMsg.username,
                message: savedMsg.message,
                avatar: savedMsg.avatar,
                timeStamp: savedMsg.timeStamp,
                tempId: msg.tempId, // send back tempId so client can replace it
            });

            console.log("Message received & saved:", savedMsg);
        } catch (err) {
            console.error("Error saving message:", err);
        }
    });


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("Working fine!🚀");
});

const port = 3002;
server.listen(port, () => {
    console.log(`Server running on port ${port}🚀`);
});
