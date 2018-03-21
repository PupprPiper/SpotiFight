require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


module.exports = {

  // updateScore: client.on('updateScore', data => {
  //   if (!masherGame.hasOwnProperty(data.localUser)) {
  //     masherGame[data.localUser] = 1;
  //   } else {
  //     masherGame[data.localUser] += 1;
  //   }
  //   console.log(masherGame);
  //   io.in(client.handshake.query.roomId).emit('displayUpdate', {
  //     player: data.localUser,
  //     score: masherGame
  //   });
  // }),
  //
  // clearBoard: client.on('clearBoard', data => {
  //   masherGame = {}
  // }),
  //
  // buildBoard: client.on('buildBoard', data => {
  //   masherGame[data.localUser] = 0
  //   io.in(client.handshake.query.roomId).emit('displayUpdate', {
  //     player: data.localUser,
  //     score: masherGame
  //   });
  // }),
  //
  //
  // finalScore: client.on('finalScore', data => {
  //   const finalScore = masherGame;
  //   io.in(client.handshake.query.roomId).emit('displayUpdate', finalScore);
  // }),
  //
  //





}
