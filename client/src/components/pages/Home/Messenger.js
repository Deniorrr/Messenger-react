import { React, useEffect, useState, useContext } from "react";
import styles from "../../style/messenger.module.scss";
import MessageSingle from "./MessageSingle";
import MessageInput from "./MessageInput";
import { ApiContext } from "../../../contexts/ApiContext";
import { jwtDecode } from "jwt-decode";

function Messenger(props) {
  const fetchMessages = useContext(ApiContext).fetchMessages;
  const sendMessage = useContext(ApiContext).sendMessage;

  const [messages, setMessages] = useState([]);

  const decoded = jwtDecode(localStorage.getItem("accessToken"));

  useEffect(() => {
    fetchMessages(props.conversationId).then((res) => {
      setMessages(res);
    });
  }, [props.conversationId]);

  if (props.conversationId < 1) return <main>Select a conversation</main>;

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
    const elements = messages.map((x) => (
      <MessageSingle
        messageText={x.message}
        isMyMessage={x.senderId === decoded.id}
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
            {props.conversationId}
          </div>
        </div>
        <main className={styles.messages}>{renderMessages()}</main>
        <MessageInput
          sendMessage={(message) => sendMessage(props.conversationId, message)}
        />
      </div>
    </main>
  );
}

export default Messenger;
