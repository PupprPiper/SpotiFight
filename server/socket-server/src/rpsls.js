require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);

module.exports = {
  makeChoice : (client, users, connections,  io) => {
    client.on('makeChoice', data => {
      io.in(client.handshake.query.roomId).emit('oppChoice', data)
    })
  },
  winner: (client, users, connections,  io) => {
    client.on('winner', data => {
      console.log('THE WINNER ', data)
      io.in(client.handshake.query.roomId).emit('final', data)
    })
  },
  tie: (client, users, connections, masherGame, io) => {
    client.on('tie', data => {
      console.log('THE WINNER ', data)
      io.in(client.handshake.query.roomId).emit('restart')
    })
  }
}