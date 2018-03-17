require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// class Rooms {
//   constructor(io) {
//     this.io = io;
//     this.store = new Map();
//     this.findOrCreate = this.findOrCreate.bind(this)
//   }
class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
    this.findOrCreate = this.findOrCreate.bind(this);
  }
}

//   findOrCreate(roomId) {
//     let room = this.store.get(roomId);
//     if (room) {
//       room = new Map();
//       room.set('id', roomId);
//       room.set('text', startingText);
//       this.store.set(roomId, room);
//     }
//     return room;
//   }
// }

const rooms = new Rooms(io);

let users = [];
let connections = [];

io.on('connection', client => {
  if (client.handshake.query.roomName) {
    client.join(client.handshake.query.roomName);
    console.log('inside???: ', client.handshake.query.roomName);
  }
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
    // io.sockets.emit('new message', { msg: data });
    io.in('test').emit('new message', { msg: data });
  });

  // join room

  client.on('joinRoom', data => {
    console.log('ROOM NAME???: ', client.handshake.query);
  });
});

//   io.on('connection', client => {
//     console.log('this is our query', client.handshake.query);

//     const room = rooms.findOrCreate(client.handshake.query.roomId);
//     client.join(client.handshake.query.roomId);

//     client.on('message', message => {
//       io.emit('serverMessage', message);
//       console.log('message received!!');
//       console.log(client.handshake.query);
//       console.log('this is our room', room);
//     });
//     console.log('a user has connected to socket server');
//   });
// });

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
