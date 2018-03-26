require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);

module.exports = {
  makeChoice : (client, users, connections, masherGame, io) => {
    client.on('makeChoice', data => {
      io.in(client.handshake.query.roomId).emit('oppChoice', data)
    })
  }
}