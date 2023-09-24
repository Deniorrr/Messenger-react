import React from "react";
import styles from "../../style/messenger.module.scss";

function MessageSingle(props) {
  const isMyMessage = props.isMyMessage;
  const messageText = props.messageText;
  return (
    <div
      className={`${styles["message"]}
      ${isMyMessage ? styles["friend-message"] : styles["my-message"]} `}
    >
      <p>{messageText}</p>
    </div>
  );
}

export default MessageSingle;
