import React, { useState, useEffect, useRef } from "react";
import SendMessage from "./CreateMessage";
import Message from "./Messages";

import socketIOClient from "socket.io-client";

var socket = null; // endpoint for sending and receiving data

const ChatRoom = () => {
  const [messagesContent, setMessagesContent] = useState([]); // contain all messages
  const [currentMessage, setCurrentMessage] = useState(""); // the last sent message for the onChange func
  const [username, setUsername] = useState("");
  const myRef = useRef(null);

  useEffect(() => {
    // Creates a new socket if not exist
    if (socket === null) {
      socket = socketIOClient("http://localhost:4001");
    }

    // listening if a new user has connected
    socket.on("SET_USERNAME", (username) => {
      setUsername({ username });
    });

    // when a msg has recieved, we will add the msg to out msg array
    socket.on("CREATE_MESSAGE", (messageObject) => {
      setMessagesContent([...messagesContent, messageObject]);
      myRef.current.scrollTop = myRef.current.clientHeight;
    });
  }, [messagesContent, username]);

  const handleSendClick = (e) => {
    e.preventDefault();

    const message = {
      content: currentMessage,
      user: username,
    };
    socket.emit("SEND_MESSAGE", { message });
    setCurrentMessage("");
  };

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div className="messages" ref={myRef}>
        {messagesContent.length > 0 &&
          messagesContent.map((message, indx) => (
            <Message key={indx} message={message} username={username} />
          ))}
      </div>
      <SendMessage
        onSendClicked={handleSendClick}
        onInputChanged={handleInputChange}
        currentMessage={currentMessage}
      />
    </div>
  );
};

export default ChatRoom;
