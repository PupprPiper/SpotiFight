module.exports = {
  funcName : (client, users, connections, masherGame, io) => {
    client.on('funcName', data => {
      io.in(client.handshake.query.roomId).emit('something else', 'stuff you want to emit')
    })
  }
}