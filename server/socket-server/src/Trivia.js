module.exports = {

removeOptions : (client, io, userObject, roomId) => {
  client.on('REMOVE_TRIVIA_OPTIONS', data=>{
    io.in(client.handshake.query.roomId).emit('REMOVE_TRIVIA_OPTIONS_ALL', data)
  })
},
winner: (client, io, userObject, roomId) => {
  client.on('TRIVIA_WINNER', data => {
    io.in(client.handshake.query.roomId).emit('ANNOUNCE_WINNER', data)
  })
},
question: (client, io, userObject, roomId) => {
  client.on('HOST_QUESTION', data => {
    io.in(client.handshake.query.roomId).emit('RECIEVE_QUESTION', data)
  })
}
}