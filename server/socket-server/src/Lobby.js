require("babel-register");
require("babel-polyfill");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const _ = require("underscore");

module.exports = {
  lobbyActions: (client, io, userObject, roomId) => {
    client.on("USER_ENTER_LOBBY", user => {
     
      userObject[roomId].push(user);
      io.emit("OPEN_ROOMS", Object.keys(userObject));
      io.emit('NUMBER_OF_PEOPLE', Object.values(userObject))
      io.in(client.handshake.query.roomId).emit("newMessage", {
        msg: `${user.username} has entered lobby`
      });

      io.in(client.handshake.query.roomId).emit("newUser");

    

      client.on("disconnect", data => {
        if (userObject[roomId]) {
          userObject[roomId] = _.reject(userObject[roomId], item => {
            return item.username === user.username;
          });

          io
            .in(client.handshake.query.roomId)
            .emit("ACTIVE_USERS", userObject[roomId]);
        }

        io.in(client.handshake.query.roomId).emit("newMessage", {
          msg: `${user.username} has disconnected`
        });

        if (userObject[roomId] && userObject[roomId].length === 0) {
          delete userObject[roomId];
        }

        io.emit("OPEN_ROOMS", Object.keys(userObject));
        io.emit('NUMBER_OF_PEOPLE', Object.values(userObject))
      });
      io
        .in(client.handshake.query.roomId)
        .emit("ACTIVE_USERS", userObject[roomId]);
        
      client.on("sendSongChoices", data => {
        io.in(client.handshake.query.roomId).emit("songChoices", data);
      });
    });
  }
};
