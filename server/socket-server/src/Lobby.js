require("babel-register");
require("babel-polyfill");
const express = require("express");
const app = express();
const http = require("http").Server(app);

module.exports = {
  lobbyActions: (client, io, userObject, roomId) => {
    client.on("USER_ENTER_LOBBY", user => {
      console.log(userObject);
      userObject[roomId].push(user);
      console.log("userObject", userObject);
      io.in(client.handshake.query.roomId).emit("newMessage", {
        msg: `${user.username} has entered lobby`
      });

      console.log(`${user.username} has entered lobby`);
      client.on("disconnect", data => {
        userObject[roomId].splice(userObject[roomId].indexOf(user.username), 1);
        io.in(client.handshake.query.roomId).emit("newMessage", {
          msg: `${user.username} has disconnected`
        });
        io
          .in(client.handshake.query.roomId)
          .emit("ACTIVE_USERS", userObject[roomId]);
        if (userObject[roomId].length === 0) {
          delete userObject[roomId];
        }
        console.log("userObject", userObject);
      });
      io
        .in(client.handshake.query.roomId)
        .emit("ACTIVE_USERS", userObject[roomId]);

      client.on("sendSongChoices", data => {
        console.log("PICKED SONG OBJECT ", data);
        io.in(client.handshake.query.roomId).emit("songChoices", data);
      });
    });
  }
};
