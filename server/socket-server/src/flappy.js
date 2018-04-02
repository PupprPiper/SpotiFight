const express = require('express');

module.exports = {
  updateCrashed: (client, users, connections, io) => {
    client.on('PLAYER_CRASHED', data => {
      io
        .in(client.handshake.query.roomId)
        .emit('CRASHED', { username: data.username, crashed: data.crashed });
    });
  }
};
