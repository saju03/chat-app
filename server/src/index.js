
import express from "express"
import initDB from "./Database/dbConfig.js";
import http from 'node:http';
import { Server } from "socket.io";
import cors from 'cors'
const app = express()
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: 'http://localhost:5173', // React app URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  const users = {};


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));


app.get('/', (req, res) => {
    res.send('Hello from Express');
});

io.on('connection', (socket) => {
  console.log('socket connection establised');

  socket.on('reg',(uid)=>{
    users[uid] = socket.id;
    console.log(`User registered: ${uid} with socket ID: ${socket.id}`);
  })

  socket.on('privetMsg',({recipientID,message})=>{
    
    const recipientSocketId = users[recipientID];
    if(recipientSocketId){
      io.to(recipientSocketId).emit('privetMsg',{
        from:Object.keys(users).find(item=>users[item] == socket.id),
        message:message
        
      })
    }


  })


  
    socket.on('message',(data)=>{
    console.log('Message received:', data);
    socket.emit('newMessage', `Server received: ${data}`);
})



socket.on('disconnect', (socket) => {
    console.log('A user disconnected',socket);
  });

  console.log('users = ',users);

})



initDB().then(() => {

    server.listen(3000, () => {
        console.log(`Server running on http://localhost:3000`);
    });
})