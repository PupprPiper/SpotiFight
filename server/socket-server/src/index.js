require("babel-register");
require("babel-polyfill");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const Masher = require("./masher");
const rpsls = require("./rpsls");

const Flappy = require("./flappy")

const Lobby = require("./Lobby");
const GameRoom = require("./GameRoom");
const Chat = require("./Chat");
const Trivia = require('./Trivia')

let userObject = {};
let users = [];
let connections = [];
let person = ""


io.on("connection", client => {
  //SOCKET ROOM SET UP DO NOT DELETE
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

  Lobby.lobbyActions(client, io, userObject, roomId)
  client.on("disconnect", data => {
    connections.splice(connections.indexOf(client), 1);
    console.log(`Disconnected: %s clients connected ${connections.length}`);
  });

  client.emit('OPEN_ROOMS', Object.keys(userObject))

  Chat.sendMessage(client, io, users, person)
GameRoom.startGameHost(client, io, userObject)
GameRoom.broadcastWinner(client, io, userObject)
GameRoom.sendWinnerSong(client, io, userObject)

  Trivia.removeOptions(client, io, userObject, roomId)


  Trivia.removeOptions(client, io, userObject, roomId)

  Masher.updateScore(client, users, connections,  io);
  Masher.clearBoard(client, users, connections,  io);
  Masher.buildBoard(client, users, connections,  io);
  Masher.finalScore(client, users, connections, io);

  rpsls.makeChoice(client, users, connections, io);
  rpsls.winner(client, users, connections, io);


  // END MASHER END MASHER END MASHER END MASHER END MASHER END MASHER END MASHER

  // START FLAPPY
  Flappy.updateCrashed(client, users, connections, io);
  Flappy.updateGrid(client, users, connections, io);
  // END FLAPPY
});

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
