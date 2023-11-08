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
        {details.firstName[0] + details.lastName[0]}
      </div>
      <div className={styles.details}>
        <header>
          <p className={styles.name}>
            {details.firstName} {details.lastName}
          </p>
          <p className={styles.time}>when</p>
        </header>
        <p className={styles.message}>message</p>
      </div>
    </li>
  );
}

export default ConversationListSingle;
