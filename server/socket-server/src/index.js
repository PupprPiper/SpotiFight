require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);






let users = [];
let connections = [];

io.on('connection', client => {
  
  if(client.handshake.query.roomId){
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
    io.in(client.handshake.query.roomId).emit('new message', { msg: data });
  });

  client.on('startGameHost', data =>{
    console.log(data);
    io.in(client.handshake.query.roomId).emit('startGameAll', data)
  })


})

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));

