const io = require('socket.io');

const socketServer = (server)=>{

    const socket = io(server);
    const mySocket = socket.of('/socket');

    mySocket.on('connection',(socket)=>{
        console.log("connection")

        socket.on('newMessage',(message)=>{
            console.log(message.msg);
        })

        socket.on('disconnection',()=>{
            console.log('disconnection')
        })
    })

}

module.exports = socketServer;
