module.exports = {
  sendMessage : (client, io, users, person) => {
    client.on('CHAT_USER', chatter =>{
      person = chatter;
    })
    client.on("send message", data => {
      console.log(data);
      io.in(client.handshake.query.roomId).emit("newMessage", {
        msg: person + ': ' +data
      });
    });
  
  }
}