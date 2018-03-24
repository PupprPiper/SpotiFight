require('babel-register');
require('babel-polyfill');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Masher = require('./masher');




let users = [];
let connections = [];


io.on('connection', client => {

  if (client.handshake.query.roomId) {
    client.join(client.handshake.query.roomId)
    console.log('new user has joined room: ', client.handshake.query.roomId);
  }
  connections.push(client);
  console.log(`Connected %s clients connected ${connections.length}`);

  // disconnect
  client.on('disconnect', data => {
    connections.splice(connections.indexOf(client), 1);

    console.log(`Disconnected: %s clients connected ${connections.length}`);
  });

  // send message
  client.on('send message', data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit('newMessage', {
      msg: data
    });
  });

  client.on('startGameHost', data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit('startGameAll', data)
  });

  client.on('broadcastWinner', data => {
    console.log(data);
    io.in(client.handshake.query.roomId).emit('receiveWinner', data)
  });

  client.on('SEND_WINNER_SONG', data => {
    io.in(client.handshake.query.roomId).emit('GLOBAL_SONG', data)
  });

  client.on('USER_ENTER_LOBBY',  user => {
    users.push(user)
    io.in(client.handshake.query.roomId).emit('newMessage', {
      msg: `${user.username} has entered lobby`
    });
    console.log(`${user.username} has entered lobby`)
    client.on('disconnect', data =>{
      users.splice(users.indexOf(user.username), 1)
      io.in(client.handshake.query.roomId).emit('newMessage', {
        msg: `${user.username} has disconnected`
      });
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
      io.in(client.handshake.query.roomId).emit('ACTIVE_USERS', users)
    })
    io.in(client.handshake.query.roomId).emit('ACTIVE_USERS', users)
  })
>>>>>>> refactored sockets to clean them up

// MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER

<<<<<<< HEAD
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
=======
      io.in(client.handshake.query.roomId).emit('ACTIVE_USERS', users)
    })
    io.in(client.handshake.query.roomId).emit('ACTIVE_USERS', users)
  })



// MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER  MASHER

<<<<<<< HEAD
=======
>>>>>>> refactored sockets to clean them up
 Masher.updateScore(client, users, connections, masherGame, io);
 Masher.clearBoard(client, users, connections, masherGame, io);
 Masher.buildBoard(client, users, connections, masherGame, io);
<<<<<<< HEAD
 Masher.finalScore(client, users, connections, masherGame, io)
<<<<<<< HEAD
>>>>>>> refactored sockets to clean them up

  client.on("finalScore", data => {
    const finalScore = masherGame;
    io.in(client.handshake.query.roomId).emit("finalScoreObject", finalScore);
    console.log("finalScore firing on server", finalScore);
  });
=======
>>>>>>> refactored sockets to clean them up
=======
 Masher.finalScore(client, users, connections, masherGame, io);
>>>>>>> refactor
=======
 Masher.updateScore(client, users, connections, io);
 Masher.clearBoard(client, users, connections, io);
 Masher.buildBoard(client, users, connections, io);
 Masher.finalScore(client, users, connections, io);
>>>>>>> rebase check

})

const PORT = 8000;
http.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
