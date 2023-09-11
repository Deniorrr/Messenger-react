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
      <div className={styles.portrait}>
        {details.name[0] + details.surname[0]}
      </div>
      <div className={styles.details}>
        <p>
          {details.name} {details.surname}
        </p>
        <p>{details.lastMessage}</p>
      </div>
    </li>
  );
}

export default ConversationListSingle;
