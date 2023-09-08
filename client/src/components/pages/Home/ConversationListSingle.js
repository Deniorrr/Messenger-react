import React from "react";
import styles from "../../style/aside.module.scss";

function ConversationListSingle(props) {
  const details = props.details;
  return (
    <li
      onClick={() => {
        props.displayConversation(details.id);
      }}
      className={props.isActive ? styles.active : ""}
    >
      <p>
        {details.name} {details.surname}
      </p>
      <p>{details.lastMessage}</p>
    </li>
  );
}

export default ConversationListSingle;
