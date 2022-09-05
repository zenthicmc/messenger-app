exports.socketConf = (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
        console.log(`A user has joined room ${room}`);
    })

    socket.on('sendMessage', (room, data) => {
        socket.to(room).emit("message", data);
    })
}