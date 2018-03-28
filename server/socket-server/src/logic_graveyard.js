// client.on('CHAT_USER', chatter =>{
//   person = chatter;
// })
// client.on("send message", data => {
//   console.log(data);
//   io.in(client.handshake.query.roomId).emit("newMessage", {
//     msg: person + ': ' +data
//   });
// });

// client.on("startGameHost", data => {
//   console.log(data);
//   io.in(client.handshake.query.roomId).emit("startGameAll", data);
// });

// client.on("broadcastWinner", data => {
//   console.log(data);
//   io.in(client.handshake.query.roomId).emit("receiveWinner", data);
// });

// client.on("SEND_WINNER_SONG", data => {
//   io.in(client.handshake.query.roomId).emit("GLOBAL_SONG", data);
// });



  // client.on("USER_ENTER_LOBBY", user => {
  //   userObject[roomId].push(user);
  //   console.log("userObject", userObject);
  //   io.in(client.handshake.query.roomId).emit("newMessage", {
  //     msg: `${user.username} has entered lobby`
  //   });
  //   console.log(`${user.username} has entered lobby`);
  //   client.on("disconnect", data => {
  //     userObject[roomId].splice(userObject[roomId].indexOf(user.username), 1);
  //     io.in(client.handshake.query.roomId).emit("newMessage", {
  //       msg: `${user.username} has disconnected`
  //     });
  //     io
  //       .in(client.handshake.query.roomId)
  //       .emit("ACTIVE_USERS", userObject[roomId]);
  //     if (userObject[roomId].length === 0) {
  //       delete userObject[roomId];
  //     }
  //     console.log("userObject", userObject);
  //   });
  //   io
  //     .in(client.handshake.query.roomId)
  //     .emit("ACTIVE_USERS", userObject[roomId]);
  // });


  // client.on("updateScore", data => {
  //   if (!masherGame.hasOwnProperty(data.localUser)) {
  //     masherGame[data.localUser] = 1;
  //   } else {
  //     masherGame[data.localUser] += 1;
  //   }
  //   console.log(masherGame);
  //   io.in(client.handshake.query.roomId).emit("displayUpdate", {
  //     player: data.localUser,
  //     score: masherGame
  //   });
  // });
  //
  // client.on("clearBoard", data => {
  //   masherGame = {};
  // });
  //
  // client.on("buildBoard", data => {
  //   masherGame[data.localUser] = 0;
  //   io.in(client.handshake.query.roomId).emit("displayUpdate", {
  //     player: data.localUser,
  //     score: masherGame
  //   });
  // });
  //
  // client.on("finalScore", data => {
  //   const finalScore = masherGame;
  //   io.in(client.handshake.query.roomId).emit("finalScoreObject", finalScore);
  //   console.log("finalScore firing on server", finalScore);
  // });
