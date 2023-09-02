import React from "react";

function ConversationSingle(props) {
  const details = props.details;
  return (
    <div>
      <p>
        {details.name} {details.surname}
      </p>
      <p>{details.lastMessage}</p>
    </div>
  );
}

export default ConversationSingle;
