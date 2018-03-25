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
  

  }
   


}