const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

let userCount = 1;

io.on("connection", (socket) => {
  userCount++;

  const username = `User ${userCount}`;

  socket.emit("SET_USERNAME", username); // update the client that new user has connected
  io.sockets.emit("CREATE_MESSAGE", {
    // updates everybody that a new user has connected
    content: `${username} connected`,
  });

  // when a msg is send to server it will recieve the new msg object and let everybody (all open sockets) know what is the msg
  socket.on("SEND_MESSAGE", (messageObject) => {
    io.sockets.emit("CREATE_MESSAGE", messageObject);
  });

  socket.on("disconnect", () => {
    io.sockets.emit("CREATE_MESSAGE", {
      content: `${username} disconnected`,
    });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// update package.json to start also the server by 'node server.js'
