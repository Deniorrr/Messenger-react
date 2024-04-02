import React from "react";
import { useState } from "react";
import styles from "../../style/messenger.module.scss";

function MessageInput(props) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    props.sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
    }
  };

  return (
    <div className={styles["message-input"]}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => sendMessage()}>
        <figure className={styles["svg-icon"]}></figure>
      </button>
    </div>
  );
}

export default MessageInput;
