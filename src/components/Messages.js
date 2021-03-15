import React from "react";
import PropTypes from "prop-types";

const Messages = ({ messages, username, refProp }) => (
  <div className="messages" ref={refProp}>
    {messages.map((message, indexMessage) => (
      <div
        className={`message ${username === message.user ? "message--me" : ""}`}
        key={indexMessage}
      >
        <div className="message__user">{message.user}</div>
        <div className="message__content">{message.content}</div>
      </div>
    ))}
  </div>
);

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  refProp: PropTypes.object.isRequired,
};

export default Messages;
