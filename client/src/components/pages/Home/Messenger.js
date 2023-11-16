import { React, useEffect, useState, useContext, useRef } from "react";
import styles from "../../style/messenger.module.scss";
import MessageSingle from "./MessageSingle";
import MessageInput from "./MessageInput";
import { ApiContext } from "../../../contexts/ApiContext";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";

function Messenger(props) {
  const socket = useRef(
    io("http://localhost:3001", {
      query: {
        token: useContext(ApiContext).getToken(),
      },
    })
  );

  const [messages, setMessages] = useState([]);
  const [decodedToken, setDecodedToken] = useState({});

  const fetchMessages = useContext(ApiContext).fetchMessages;
  const sendMessageApi = useContext(ApiContext).sendMessage;
  const getToken = useContext(ApiContext).getToken;

  useEffect(() => {
    const socketHelper = socket.current;

    socketHelper.on("receive-message", (message, senderId) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: senderId, message: message },
      ]);
    });

    return () => {
      socketHelper.off("receive-message");
    };
  });

  const sendMessage = (message) => {
    if (message === "") return;
    socket.current.emit("send-message", props.conversationId, message);
    // sendMessageApi(props.conversationId, message)
    //   .then(() => {
    //     setMessages([
    //       ...messages,
    //       { senderId: decodedToken.id, message: message },
    //     ]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    try {
      setDecodedToken(jwtDecode(getToken()));
    } catch (err) {
      return;
    }
    fetchMessages(props.conversationId)
      .then((res) => {
        setMessages(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.conversationId, fetchMessages, getToken]);

  if (props.conversationId < 1) return <main>Select a conversation</main>;

  const friendData = {
    name: "Denis",
    surname: "Poczęty",
    userId: 1,
  };

  const renderMessages = () => {
    const elements = messages.map((x) => (
      <MessageSingle
        messageText={x.message}
        isMyMessage={x.senderId === decodedToken.id}
      />
    ));
    return elements;
  };
  return (
    <main>
      <div className={styles.messenger}>
        <div className={styles["friend-profile-bar"]}>
          <div className={styles.portrait}>
            {friendData.name[0] + friendData.surname[0]}
          </div>
        </div>
        <main className={styles.messages}>{renderMessages()}</main>
        <MessageInput sendMessage={(message) => sendMessage(message)} />
      </div>
    </main>
  );
}

export default Messenger;
