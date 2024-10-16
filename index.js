const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=socketIo(server);
const users={};
app.use(express.static('public'));
io.on('connection',(socket)=>{
    socket.on('new-user-come',(name)=>{
        users[socket.id]=name;
        socket.broadcast.emit('user joined',name);
        console.log(name,'user came');
    });
    socket.on('send',(msg)=>{
        socket.broadcast.emit('recieve',{msg:msg,name:users[socket.id]})
})
})

server.listen(3000,()=>{
    console.log("app is running on port 3000");
})