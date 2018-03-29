const express = require('express');

module.exports = {
  updateCrashed: (client, users, connections, flappyGame, io) => {
    client.on('PLAYER_CRASHED', data => {
      io.emit('CRASHED', { username: data.username, crashed: data.crashed });
    });
  },
  updateGrid: (client, users, connections, flappyGame, io) => {
    client.on('TO_SERVER_GRID', data => {
      io.emit('TO_CLIENT_GRID', data);
    });
  }
};
