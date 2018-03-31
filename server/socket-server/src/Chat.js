module.exports = {
  sendMessage : (client, io, users, person) => {
    // client.on('CHAT_USER', data =>{
    //   person = data;
    // })
    client.on("send message", data => {
      io.in(client.handshake.query.roomId).emit("newMessage", {
        username: data.username,
        avatar_url: data.avatar_url,
        msg: data.msg
      });
    });
  }
}