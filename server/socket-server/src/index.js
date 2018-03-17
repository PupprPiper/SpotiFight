
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('babel-register')
require('babel-polyfill')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io= require('socket.io')(http)





let users = [];
let connections = [];

io.on('connection', client => {
  connections.push(client);
  console.log(`Connected %s clients connected ${connections.length}`);

  // disconnect
  client.on('disconnect', data => {
    connections.splice(connections.indexOf(client), 1);
    console.log(`Disconnected: %s clients connected ${connections.length}`);
  });

  // send message
  client.on('send message', data => {
    console.log(data);
    io.sockets.emit('new message', { msg: data });
  });

io.on('connection', (client) => {
  // success('client connected');
  // const { roomId } = client.handshake.query;
  // const room = rooms.findOrCreate(roomId || 'default');
  // client.join(room.get('id'));

  // each(clientEvents, (handler, event) => {
  //   client.on(event, handler.bind(null, { io, client, room }));
  // });
  console.log('this is our query', client.handshake.query)

  const room = rooms.findOrCreate(client.handshake.query.roomId)
  client.join(client.handshake.query.roomId)


  client.on('game', (message) => {
    io.emit('serverMessage', message)
    console.log('message received!!')
    console.log(client.handshake.query)
    console.log('this is our room', room)
  })
  console.log('a user has connected to socket server')
});
})

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
