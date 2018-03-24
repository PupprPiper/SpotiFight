require("babel-register");
require("babel-polyfill");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const Masher = require("./masher");

let userObject = {};

let users = [];
let connections = [];
let masherGame = {};

io.on("connection", client => {
  let roomId = client.handshake.query.roomId;
  if (client.handshake.query.roomId) {
    client.join(client.handshake.query.roomId);
    if (!userObject[roomId]) {
      userObject[roomId] = [];
    }
    console.log("new user has joined room: ", client.handshake.query.roomId);
    
  }
  connections.push(client);
  console.log(`Connected %s clients connected ${connections.length}`);

  // disconnect
  client.on("disconnect", data => {
    connections.splice(connections.indexOf(client), 1);

    console.log(`Disconnected: %s clients connected ${connections.length}`);
  });

  // send message
  client.on("send message", data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit("newMessage", {
      msg: data
    });
  });

  client.on("startGameHost", data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit("startGameAll", data);
  });

  client.on("broadcastWinner", data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit("receiveWinner", data);
  });

  client.on("SEND_WINNER_SONG", data => {
    io.in(client.handshake.query.roomId).emit("GLOBAL_SONG", data);
  });

  client.on("USER_ENTER_LOBBY", user => {
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
  });

  // MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER

  client.on("updateScore", data => {
    if (!masherGame.hasOwnProperty(data.localUser)) {
      masherGame[data.localUser] = 1;
    } else {
      masherGame[data.localUser] += 1;
    }
    console.log(masherGame);
    io.in(client.handshake.query.roomId).emit("displayUpdate", {
      player: data.localUser,
      score: masherGame
    });
  });

  client.on("clearBoard", data => {
    masherGame = {};
  });

  client.on("buildBoard", data => {
    masherGame[data.localUser] = 0;
    io.in(client.handshake.query.roomId).emit("displayUpdate", {
      player: data.localUser,
      score: masherGame
    });
  });

  client.on("finalScore", data => {
    const finalScore = masherGame;
    io.in(client.handshake.query.roomId).emit("finalScoreObject", finalScore);
    console.log("finalScore firing on server", finalScore);
  });

  // END MASHER END MASHER END MASHER END MASHER END MASHER END MASHER END MASHER
});

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
