import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { ApiContext } from "./ApiContext";

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const [activeConversationId, setActiveConversationId] = useState(-1);
  // const [messages, setMessages] = useState([]);
  const [conversationList, setConversationList] = useState([]); // for aside
  const [connectionEstablished, setConnectionEstablished] = useState(false);

  const fetchConversationsApi = useContext(ApiContext).fetchConversations;

  let socket = undefined;
  const getToken = useContext(ApiContext).getToken;

  const establishConnection = () => {
    //if token exists, connect to socket
    if (getToken()) {
      socket = io("http://localhost:3001", {
        query: {
          token: getToken(),
        },
      });
      console.log("connected to socket");
    }
  };

  const fetchConversations = () => {
    fetchConversationsApi().then((x) => setConversationList(x));
    // setTimeout(() => {
    //   setConversationList([
    //     {
    //       id: 1,
    //       name: "test",
    //       firstName: "test",
    //       lastName: "test",
    //     },
    //   ]);
    // }, 2000);
  };

  useEffect(() => {
    if (connectionEstablished) {
      socket.on("receive-message", (message, senderId) => {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { senderId: senderId, message: message },
        // ]);
        setConversationList([
          {
            id: 1,
            name: "test",
            firstName: "test",
            lastName: "test",
          },
        ]);
      });
    }
  }, [connectionEstablished]);

  //   return () => {
  //     socketHelper.off("receive-message");
  //   };
  // });
  const x = {
    conversations: conversationList,
    fetchConversations: fetchConversations,
    establishConnection: establishConnection,
  };

  return <SocketContext.Provider value={x}>{children}</SocketContext.Provider>;
}
