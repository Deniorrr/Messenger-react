import React, { useContext } from "react";
import styles from "../../style/aside.module.scss";
import { SocketContext } from "../../../contexts/SocketContext";

function ConversationListSingle(props) {
  const setConversationId = useContext(SocketContext).setActiveConversationId;
  const details = props.details;

  const renderMessage = () => {
    if (details.message === null) {
      return <p className={styles["lessVisible"]}>No messages yet</p>;
    } else {
      return details.senderName + ": " + details.message;
    }
  };

  const renderTime = () => {
    if (details.time === null) {
      return "";
    } else {
      return (
        details.time.split("T")[1].split(":")[0] +
        ":" +
        details.time.split("T")[1].split(":")[1]
      );
    }
  };
  return (
    <li
      onClick={() => {
        setConversationId(details.id);
      }}
      className={props.isActive ? styles["active"] : ""}
    >
      <div className={styles["portrait"]}>
        {details.firstName[0] + details.lastName[0]}
      </div>
      <div className={styles["details"]}>
        <header>
          <p className={styles["name"]}>
            {details.firstName} {details.lastName}
          </p>
          <p className={styles["time"]}>{renderTime()}</p>
        </header>
        <p className={styles["mesesage"]}>{renderMessage()}</p>
      </div>
    </li>
  );
}

export default ConversationListSingle;
