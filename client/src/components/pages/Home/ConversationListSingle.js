import React from "react";
import styles from "../../style/aside.module.scss";

function ConversationListSingle(props) {
  const details = props.details;
  return (
    <li
      onClick={() => {
        props.displayConversation(details.user.id);
      }}
      className={props.isActive ? styles.active : ""}
    >
      <div className={styles.portrait}>
        {details.user.firstName[0] + details.user.lastName[0]}
      </div>

      <div className={styles.details}>
        <header>
          <p className={styles.name}>
            {details.firstName} {details.user.lastName}
          </p>
          <p className={styles.time}>{details.lastMessage.when}</p>
        </header>
        <p className={styles.message}>{details.lastMessage.message}</p>
      </div>
    </li>
  );
}

export default ConversationListSingle;
