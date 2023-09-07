import React from "react";

function ConversationListSingle(props) {
  const details = props.details;
  return (
    <div
      onClick={() => {
        props.displayConversation(details.id);
      }}
    >
      <p>
        {details.name} {details.surname}
      </p>
      <p>{details.lastMessage}</p>
    </div>
  );
}

export default ConversationListSingle;
