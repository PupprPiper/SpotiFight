require("babel-register");
require("babel-polyfill");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const _ = require('underscore')

module.exports = {
  lobbyActions: (client, io, userObject, roomId) => {
    client.on("USER_ENTER_LOBBY", user => {

    //   if(userObject[roomId].length >= 0){
    //   let mapped = userObject[roomId].map(item => {
    //     if(item){
    //     if (item.username === user.username) {
    //       return;
    //     } else if(item === undefined){
    //       return;
    //     } else if (item.username !== user.username) {
    //       return item;
    //     }
    //   }
    //   });
    //   if(mapped){
    //     userObject[roomId] = mapped
    //   }
    // }
      
      console.log(userObject);
      userObject[roomId].push(user);
      console.log("userObject", userObject);
      io.in(client.handshake.query.roomId).emit("newMessage", {
        msg: `${user.username} has entered lobby`
      });

      io.in(client.handshake.query.roomId).emit("newUser");

      console.log(`${user.username} has entered lobby`);

      client.on("disconnect", data => {

        if (userObject[roomId]) {
         userObject[roomId] = _.reject(userObject[roomId], (item) => {
            return item.username === user.username
          })
          // userObject[roomId].splice(userObject[roomId].indexOf(user.username), 1)

          // if(userObject[roomId].length > 0){
          //   let mapped = userObject[roomId].map(item => {
          //     if(item){
          //     if (item.username === user.username) {
          //       console.log("skip", item.username);
          //     } else if (item.username !== user.username) {
          //       return item;
          //     }
          //   }
          //   });
          //   if(mapped){
          //     userObject[roomId] = mapped
          //   }
          // }
          io.in(client.handshake.query.roomId).emit("ACTIVE_USERS", userObject[roomId]);
        
        }

        io.in(client.handshake.query.roomId).emit("newMessage", {
          msg: `${user.username} has disconnected`
        });

        if (userObject[roomId] && userObject[roomId].length === 0) {
          delete userObject[roomId];
        }

        io.emit("OPEN_ROOMS", Object.keys(userObject));
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
