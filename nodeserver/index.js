//node server which will handle socket.io connection
const io = require('socket.io')(8000,{
    cors: {
        origin: "http://127.0.0.1:5500",  // Allow requests from this origin
        methods: ["GET", "POST"]  // Allow only specified methods
    }
});
const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name1=>{
        console.log(name1);
        users[socket.id] = name1;
        socket.broadcast.emit('user-joined',name1);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})


