module.exports ={

  startGameHost: (client, io, users) =>{
    client.on('startGameHost', data => {
      console.log(data);
      io.in(client.handshake.query.roomId).emit('startGameAll', data)
    });
  },
  broadcastWinner: (client, io, users) => {
    client.on('broadcastWinner', data => {
      console.log(data);
      io.in(client.handshake.query.roomId).emit('receiveWinner', data)
    });

  },
  sendWinnerSong: (client, io, users) => {
      
    client.on('SEND_WINNER_SONG', data => {
      io.in(client.handshake.query.roomId).emit('GLOBAL_SONG', data)
    });
  

  },

  returnToLobby: (client, io, users)=> {
    client.on('RETURN_TO_LOBBY', data => {
      io.in(client.handshake.query.roomId).emit('RETURN_ALL_TO_LOBBY', data)
    });
  },
  
  countdown: (client, io, users) => {
    client.on('COUNTER', data =>{
      io.in(client.handshake.query.roomId).emit('START_COUNTER_FOR_ALL', data)
    })
  }


}