const http = require('http');
const SocketIo = require('socket.io');

const server = http.createServer();
const io = SocketIo(server);


io.on('connection', (client) => {
  console.log('client connected')
});

const PORT = process.env.PORT || 4155;
server.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
