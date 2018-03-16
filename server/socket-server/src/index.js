const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// const rooms = new Rooms(io);

let users = [];
let connections = [];

io.on('connection', socket => {
  connections.push(socket);
  console.log(`Connected %s sockets connected ${connections.length}`);

  // disconnect
  socket.on('disconnect', data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: %s sockets connected ${connections.length}`);
  });

  // send message
  socket.on('send message', data => {
    console.log(data);
    io.sockets.emit('new message', { msg: data });
  });
});

// io.on('connection', client => {
//   // success('client connected');
//   // const { roomId } = client.handshake.query;
//   // const room = rooms.findOrCreate(roomId || 'default');
//   // client.join(room.get('id'));

//   // each(clientEvents, (handler, event) => {
//   //   client.on(event, handler.bind(null, { io, client, room }));
//   // });
//   client.join('lobby');
//   client.on('message', message => {
//     io.emit('serverMessage', message);
//     console.log('message received!!');
//   });
//   console.log('a user has connected to socket server');
// });

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
