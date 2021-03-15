import React from "react";
import PropTypes from "prop-types";

const CreateMessage = ({
  messageContent,
  onChangeMessageContent,
  onFormSubmit,
}) => (
  <form className="create-message" onSubmit={(e) => onFormSubmit(e)}>
    <input
      type="text"
      value={messageContent}
      onChange={onChangeMessageContent}
      placeholder="Type a message"
    />
    <input type="submit" value="SEND" />
  </form>
);

CreateMessage.propTypes = {
  messageContent: PropTypes.string.isRequired,
  onChangeMessageContent: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default CreateMessage;
