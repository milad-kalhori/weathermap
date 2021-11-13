const SocketIOClient = require('socket.io-client');

const socketClient = ()=> {
    const socket = SocketIOClient.connect('http://localhost:5000/socket');
    socket.emit('newMessage',{
        msg : "newMessage from socket"
    })
}

module.exports = socketClient;
