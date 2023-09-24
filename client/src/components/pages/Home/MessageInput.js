import React from "react";
import { useState } from "react";
import styles from "../../style/messenger.module.scss";
import sendIcon from "../../../assets/send.svg";

function MessageInput(props) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    props.sendMessage(message);
    setMessage("");
  };
  return (
    <div className={styles["message-input"]}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>
        <img src={sendIcon} alt="send" onClick={() => sendMessage()} />
      </button>
    </div>
  );
}

export default MessageInput;
