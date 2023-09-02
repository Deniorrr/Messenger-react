import React from "react";
import ConversationSingle from "./ConversationSingle";

function ConversationList() {
  const data = Array(10).fill({
    name: "Denis",
    surname: "Poczęty",
    color: "#ff00ff",
    lastMessage: "siema co tam",
    timestamp: "30 min",
  });

  return (
    <div id="conversation-list">
      {data.map((details) => (
        <ConversationSingle details={details} />
      ))}
    </div>
  );
}

export default ConversationList;
