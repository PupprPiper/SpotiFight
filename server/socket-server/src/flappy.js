const express = require('express');

module.exports = {
  updateCrashed: (client, users, connections, io) => {
    client.on('PLAYER_CRASHED', data => {
      io
        .in(client.handshake.query.roomId)
        .emit('CRASHED', { username: data.username, crashed: data.crashed });
    });
  },
  updateWinner: (client, users, connections, io) => {
    client.on('WINNER_CLIENT', data => {
      io
        .in(client.handshake.query.roomId)
        .emit('WINNER_SERVER', { winner: data });
    });
  }
};
