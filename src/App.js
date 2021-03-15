import React, { useState, useEffect, useRef } from "react";
import CreateMessage from "./components/CreateMessage";
import Messages from "./components/Messages";

import socketIOClient from "socket.io-client";

// endpoint for sending and receiving data
var socket = null;

const App = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const myRef = useRef();

  //
  useEffect(() => {
    // Creates a new socket if not exist
    if (socket === null) {
      socket = socketIOClient("http://localhost:4001");
    }

    // listening if a new user has connected
    socket.on("SET_USERNAME", (username) => {
      setUsername(username);
    });

    // when a msg has recieved, we will add the msg to out msg array
    socket.on("CREATE_MESSAGE", (messageObject) => {
      setMessages([...messages, messageObject]);
      myRef.current.scrollTop = myRef.current.clientHeight;
    });
  }, [messages, username]);

  const handleChangeMessageContent = (e) => {
    setMessageContent(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (messageContent === "") {
      return;
    }
    const message = {
      content: messageContent,
      user: username,
    };

    setMessageContent("");
    socket.emit("SEND_MESSAGE", message);
  };

  return (
    <div className="chat">
      <Messages refProp={myRef} messages={messages} username={username} />
      <CreateMessage
        messageContent={messageContent}
        onChangeMessageContent={handleChangeMessageContent}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default App;
