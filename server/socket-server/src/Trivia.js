module.exports = {

removeOptions : (client, io, userObject, roomId) => {
  client.on('REMOVE_TRIVIA_OPTIONS', data=>{
    io.in(client.handshake.query.roomId).emit('REMOVE_TRIVIA_OPTIONS_ALL', data)
  })
}
}