require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);

module.exports = {

  updateScore: (client, users, connections, masherGame, io) => { client.on('updateScore', data => {
    if (!masherGame.hasOwnProperty(data.localUser)) {
      masherGame[data.localUser] = 1;
    } else {
      masherGame[data.localUser] += 1;
    }
    console.log(masherGame);
    io.in(client.handshake.query.roomId).emit('displayUpdate', {
      player: data.localUser,
      score: masherGame
    });
  })},

  clearBoard: (client, users, connections, masherGame, io) => { client.on('clearBoard', data => {
    masherGame = {}

    return masherGame;
  })},

  buildBoard: (client, users, connections, masherGame, io) => {client.on('buildBoard', data => {
      masherGame[data.localUser] = 0
      io.in(client.handshake.query.roomId).emit('displayUpdate', {
        player: data.localUser,
        score: masherGame
      });
    })},


  finalScore: (client, users, connections, masherGame, io) => {client.on('finalScore', data => {
      const finalScore = masherGame;
      console.log('DATA HEREEEEE ', data)
      io.in(client.handshake.query.roomId).emit('finalScoreObject', finalScore);
      console.log('finalScore firing on server', finalScore)
    })},

}

// client.on('updateScore', data => {
//     if (!masherGame.hasOwnProperty(data.localUser)) {
//       masherGame[data.localUser] = 1;
//     } else {
//       masherGame[data.localUser] += 1;
//     }
//     console.log(masherGame);
//     io.in(client.handshake.query.roomId).emit('displayUpdate', {
//       player: data.localUser,
//       score: masherGame
//     });
//   });
//
//   client.on('clearBoard', data => {
//     masherGame = {}
//   });
//
//   client.on('buildBoard', data => {
//     masherGame[data.localUser] = 0
//     io.in(client.handshake.query.roomId).emit('displayUpdate', {
//       player: data.localUser,
//       score: masherGame
//     });
//   });
//
//
//   client.on('finalScore', data => {
//     const finalScore = masherGame;
//     io.in(client.handshake.query.roomId).emit('finalScoreObject', finalScore);
//     console.log('finalScore firing on server', finalScore)
//   });
