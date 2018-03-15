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
