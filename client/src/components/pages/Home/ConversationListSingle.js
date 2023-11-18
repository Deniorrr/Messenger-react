import React, { useContext } from "react";
import styles from "../../style/aside.module.scss";
import { SocketContext } from "../../../contexts/SocketContext";

function ConversationListSingle(props) {
  const setConversationId = useContext(SocketContext).setActiveConversationId;
  const details = props.details;
  return (
    <li
      onClick={() => {
        setConversationId(details.id);
        //props.displayConversation(details.id);
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
          <p className={styles.time}>{details.time}</p>
        </header>
        <p className={styles.message}>
          {details.senderName + ": " + details.message}
        </p>
      </div>
    </li>
  );
}

export default ConversationListSingle;
