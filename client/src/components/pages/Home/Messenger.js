import { React, useEffect, useState } from "react";
import styles from "../../style/messenger.module.scss";
import MessageSingle from "./MessageSingle";
import MessageInput from "./MessageInput";
import axios from "axios";

function Messenger(props) {
  if (props.conversationId < 1) return <main>Select a conversation</main>;
  const sendMessage = (message) => {
    console.log(message);
  };
  const data = {
    name: "Denis",
    surname: "Poczęty",
    userId: 1,
    messages: [
      { who: 1, when: "12:30", message: "siema" },
      { who: 1, when: "12:30", message: "siema" },
      { who: 1, when: "12:30", message: "siema" },
      { who: 2, when: "12:30", message: "siema" },
      { who: 1, when: "12:30", message: "siema" },
    ],
  };

  const renderMessages = () => {
    const elements = data.messages.map((x) => (
      <MessageSingle
        messageText={x.message}
        isMyMessage={x.who === data.userId}
      />
    ));
    return elements;
  };
  return (
    <main>
      <div className={styles.messenger}>
        <div className={styles["friend-profile-bar"]}>
          <div className={styles.portrait}>
            {data.name[0] + data.surname[0]}
          </div>
        </div>
        <main className={styles.messages}>{renderMessages()}</main>
        <MessageInput sendMessage={(message) => sendMessage(message)} />
      </div>
    </main>
  );
}

export default Messenger;
