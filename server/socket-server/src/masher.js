require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);

let masherGame = {};

module.exports = {

  updateScore: (client, users, connections, io) => {
    client.on('updateScore', data => {
      if (!masherGame.hasOwnProperty(data.localUser)) {
        masherGame[data.localUser] = data.plusMinus;
      } else {
        masherGame[data.localUser] += data.plusMinus;
      }
      console.log(masherGame);
      io. in (client.handshake.query.roomId).emit('displayUpdate', {
        player: data.localUser,
        score: masherGame
      });
    })
  },

  clearBoard: (client, users, connections, io) => {
    client.on('clearBoard', data => {
      masherGame = {}
    })
  },

  buildBoard: (client, users, connections, io) => {
    client.on('buildBoard', data => {
      if (data.localUser) {
        masherGame[data.localUser] = 0
      }
      io. in (client.handshake.query.roomId).emit('displayUpdate', {
        player: data.localUser,
        score: masherGame
      });
    })
  },

  finalScore: (client, users, connections, io) => {
    client.on('finalScore', data => {
      const finalScore = masherGame;
      io. in (client.handshake.query.roomId).emit('finalScoreObject', finalScore);
      console.log('finalScore firing on server', finalScore)
    })
  }
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
