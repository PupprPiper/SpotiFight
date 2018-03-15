<<<<<<< HEAD
const http = require('http');
const SocketIo = require('socket.io');

const server = http.createServer();
const io = SocketIo(server);


io.on('connection', (client) => {
  console.log('client connected')
});

const PORT = process.env.PORT || 4155;
server.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
=======
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io= require('socket.io')(http)


// const rooms = new Rooms(io);

io.on('connection', (client) => {
  // success('client connected');
  // const { roomId } = client.handshake.query;
  // const room = rooms.findOrCreate(roomId || 'default');
  // client.join(room.get('id'));

  // each(clientEvents, (handler, event) => {
  //   client.on(event, handler.bind(null, { io, client, room }));
  // });

  console.log('a user has connected to socket server')
});

const PORT = 8000
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
>>>>>>> 7c14b479117b3164461ec715750192285fcca41d
