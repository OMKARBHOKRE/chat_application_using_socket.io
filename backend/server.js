
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users =[];
io.on('connection',socket=>{
    socket.on('new user joined ',name=>{
             users[socket.id]=name;
            
             //console.log(socket.handshake.address);
           // users.forEach((user)=>{console.log(user)});
        socket.broadcast.emit('user joined',name)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id];
    })

})
