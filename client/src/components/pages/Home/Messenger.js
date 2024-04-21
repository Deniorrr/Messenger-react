import { React, useEffect, useState, useContext, useRef } from "react";
import styles from "../../style/messenger.module.scss";
import MessageSingle from "./MessageSingle";
import MessageInput from "./MessageInput";
import { SocketContext } from "../../../contexts/SocketContext";

function Messenger() {
  const messagesRef = useRef(null);
  //const [messages, setMessages] = useState([]);

  const messages = useContext(SocketContext).messages;
  const conversationId = useContext(SocketContext).activeConversationId;
  const sendMessageContext = useContext(SocketContext).sendMessage;

  const sendMessage = (message) => {
    if (message === "") return;
    sendMessageContext(message);
  };

  const scrollToBottom = () => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (conversationId < 0) return <main>Select a conversation</main>;

  const friendData = {
    name: "Denis",
    surname: "Poczęty",
    userId: 1,
  };

  const getDate = (date) => {
    return date.split("T")[0];
  };

  const renderMessages = () => {
    let previousDate = null; // to display date only once per day
    let currentDate = null;
    const elements = messages.map((x) => {
      currentDate = getDate(x.time);
      console.log(typeof x.time);
      console.log(x.time);
      if (currentDate !== previousDate) {
        previousDate = getDate(x.time);
        return (
          <>
            <div className={styles["messages-date"]}>{previousDate}</div>
            <MessageSingle
              messageText={x.message}
              isMyMessage={x.isMyMessage}
              key={x.id}
            />
          </>
        );
      }
      return (
        <MessageSingle
          messageText={x.message}
          isMyMessage={x.isMyMessage}
          key={x.id}
        />
      );
    });
    return elements;
  };
  return (
    <main>
      <div className={styles["messenger"]}>
        <div className={styles["friend-profile-bar"]}>
          <div className={styles["portrait"]}>
            {friendData.name[0] + friendData.surname[0]}
          </div>
        </div>
        <div className={styles["messages"]} ref={messagesRef}>
          {renderMessages()}
        </div>
        <MessageInput sendMessage={(message) => sendMessage(message)} />
      </div>
    </main>
  );
}

export default Messenger;
