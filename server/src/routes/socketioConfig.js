exports.socketConf = (socket) => {
    console.log("Socket.io connected")

    socket.on("setup", (userData) => {
        socket.join(userData.id);
        socket.emit("connected");
    });

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log(`User Joined Room: ${room}`)
    });

    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if(user._id == newMessageReceived._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
}