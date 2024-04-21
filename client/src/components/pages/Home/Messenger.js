import { React, useEffect, useState, useContext, useRef } from "react";
import styles from "../../style/messenger.module.scss";
import MessageSingle from "./MessageSingle";
import MessageInput from "./MessageInput";
import { SocketContext } from "../../../contexts/SocketContext";

function Messenger(props) {
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
    console.log("scrolling");
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

  const renderMessages = () => {
    const elements = messages.map((x) => (
      <MessageSingle
        messageText={x.message}
        isMyMessage={x.isMyMessage}
        key={x.id}
      />
    ));
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
