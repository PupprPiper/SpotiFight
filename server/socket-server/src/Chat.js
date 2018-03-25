module.exports = {
  sendMessage : (client, io, users) => {
    client.on("send message", data => {
      console.log(data);
      io.in(client.handshake.query.roomId).emit("newMessage", {
        msg: data
      });
    });
  }

}