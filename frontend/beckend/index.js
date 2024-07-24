require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const CHAT_BOT = 'ChatBot';

let chatRoom = ''; 
let allUsers = []; 
const cookieParser = require("cookie-parser");
const messageservice = require('./src/services/message/message.service');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request body:', req.body);
    next();
});
app.use((req, res, next) => {
    if (req.method === 'POST' && req.is('application/json') && !req.body) {
        console.error('Empty JSON body');
        return res.status(400).json({ message: 'Empty JSON body' });
    }
    next();
});


app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON:', err);
        return res.status(400).send({ message: 'Invalid JSON' });
    }
    next();
});


const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/School-management', {})
    .then(() => {
        console.log('MongoDB connected');
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error('MongoDB connection error:', error.message));


io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('leave_room', (data) => {

        let timestamp = Date.now();
        const { sender, room, __createdtime__ } = data;

     
        socket.leave(room);
        socket.to(room).emit('receive_message', {
            content: `${data.sender} has left the chat room`,
            sender: CHAT_BOT,
            timestamp,
        });

        console.log(`User has left room ${room}`);

    });
    socket.on('join_room', async (data) => {

        const { sender, room } = data; 
        socket.join(room); 
        let timestamp = Date.now(); 
       
        socket.to(room).emit('receive_message', {
            content: `${sender} has joined the chat room`,
            sender: CHAT_BOT,
            timestamp,
        });
        socket.emit('receive_message', {
            content: `Welcome ${sender}`,
            sender: CHAT_BOT,
            timestamp,
        });
        chatRoom = room;
        allUsers.push({ id: socket.id, sender, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
        socket.on('send_message', async (data) => {
            const { content, sender, room, timestamp } = data;

            try {

                const last100Messages = await messageservice.get100LastMessage(room)
                socket.emit('last_100_messages', last100Messages);
                
                const newMessage = await messageservice.addMessage(data);
                io.in(room).emit('receive_message', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }


        });

    });



});


const studRouter = require("./src/routes/student.rout");
const userRouter = require("./src/routes/user.rout");
const messageRouter = require("./src/routes/message.rout");
const teacherRouter=require("./src/routes/teacher.route")

app.use("/students", studRouter);
app.use("/message", messageRouter)
app.use("/teacher",teacherRouter)
 app.use("/users", userRouter); // Uncomment if you have user routes defined



const Student = require('./src/models/student.Schema');
const User = require('./src/models/user.Schema');
const { log } = require("console");

app.post('/create-student', async (req, res) => {
    const newStudent = new Student({
        userId: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        subjects: ['flute', 'piano'],
        age: 20,
        status: 'pending',
        user: 2,
        chats: [1],
        weeklySchedule: [2]
    });

    try {
        const savedStudent = await newStudent.save();
        console.log('Student saved successfully:', savedStudent);
        res.status(201).json(savedStudent);
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ error: 'Error saving student' });
    }
});

app.post('/create-user', async (req, res) => {
    const newUser = new User({
        userId: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        exists: true,
        password: '1111'
    });

    try {
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Error saving user' });
    }
});
