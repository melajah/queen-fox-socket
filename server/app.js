const app = require('express')();
const http = require('http').createServer(app);
// socket
const io = require('socket.io')(http);


const db = []

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("visit", function (response) {
    console.log("apakah event visit terdengar ??");
    console.log(response);
    socket.broadcast.emit("visit", response)
  })


  socket.on("send-message", function (message) {

    socket.broadcast.emit("new-message", message)
  })


  socket.on("send-message-private", function (response) {
    socket.broadcast.emit(response.to, response.message);
  })
  // emitter
  // lister
  // broadcast

  // didalam sini
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});