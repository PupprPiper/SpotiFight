require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Masher = require('./masher');




let users = [];
let connections = [];
let masherGame = {};

io.on('connection', client => {

  if (client.handshake.query.roomId) {
    client.join(client.handshake.query.roomId)
    console.log('new user has joined room: ', client.handshake.query.roomId);
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
    io.in(client.handshake.query.roomId).emit('newMessage', {
      msg: data
    });
  });

  client.on('startGameHost', data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit('startGameAll', data)
  });

  client.on('broadcastWinner', data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit('receiveWinner', data)
  });

  client.on('SEND_WINNER_SONG', data => {
    io.in(client.handshake.query.roomId).emit('GLOBAL_SONG', data)
  });

  client.on('USER_ENTER_LOBBY',  user => {
    users.push(user)
    io.in(client.handshake.query.roomId).emit('newMessage', {
      msg: `${user.username} has entered lobby`
    });
    console.log(`${user.username} has entered lobby`)
    client.on('disconnect', data =>{
      users.splice(users.indexOf(user.username), 1)
      io.in(client.handshake.query.roomId).emit('newMessage', {
        msg: `${user.username} has disconnected`
      });
      io.in(client.handshake.query.roomId).emit('ACTIVE_USERS', users)
    })
    io.in(client.handshake.query.roomId).emit('ACTIVE_USERS', users)
  })

// MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER

 Masher.updateScore(client, users, connections, masherGame, io);
 Masher.clearBoard(client, users, connections, masherGame, io);
 Masher.buildBoard(client, users, connections, masherGame, io);
 Masher.finalScore(client, users, connections, masherGame, io)
<<<<<<< HEAD
=======

// END MASHER END MASHER END MASHER END MASHER END MASHER END MASHER END MASHER


>>>>>>> 52c5e0b5d2f16e2f5f37cb606180b2a97d367ef8

})

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
