import { React, useEffect, useContext, useRef } from "react";
import styles from "../../style/messenger.module.scss";
import MessageSingle from "./MessageSingle";
import MessageInput from "./MessageInput";
import { SocketContext } from "../../../contexts/SocketContext";
import Avatar from "../../dumb_components/Avatar";

function Messenger() {
  const messagesRef = useRef(null);
  //const [messages, setMessages] = useState([]);

  const messages = useContext(SocketContext).messages;
  const conversationId = useContext(SocketContext).activeConversationId;
  const sendMessageContext = useContext(SocketContext).sendMessage;
  const userData = useContext(SocketContext).activeConversationData;

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

  // const friendData = {
  //   name: "Denis",
  //   surname: "Poczęty",
  //   userId: 1,
  // };

  const getDate = (date) => {
    return date.split("T")[0];
  };

  const renderFriendData = () => {
    return (
      <div className={styles["friend-data-wrapper"]}>
        <Avatar friend={userData} />
        <div className={styles["details"]}>
          <header>
            <p className={styles["name"]}>
              {userData.firstName} {userData.lastName}
            </p>
          </header>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    let previousDate = null; // to display date only once per day
    let currentDate = null;
    const elements = messages.map((x) => {
      currentDate = getDate(x.time);
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
        <div className={styles["friend-profile-bar"]}>{renderFriendData()}</div>
        <div className={styles["messages"]} ref={messagesRef}>
          {renderMessages()}
        </div>
        <MessageInput sendMessage={(message) => sendMessage(message)} />
      </div>
    </main>
  );
}

export default Messenger;
