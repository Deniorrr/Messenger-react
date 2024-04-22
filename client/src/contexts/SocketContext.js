import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import api from "../api/ApiConfig";
import { jwtDecode } from "jwt-decode";
import useAuthToken from "../hooks/useAuthToken";
import soundEffect from "../assets/notification.wav";

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const navigate = useNavigate();
  const [activeConversationId, setActiveConversationId] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [conversationList, setConversationList] = useState([]); // for aside
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const authToken = useAuthToken();
  const [decodedToken, setDecodedToken] = useState("");
  const [activeConversationData, setActiveConversationData] = useState({});

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authToken) {
      setDecodedToken(jwtDecode(authToken));
    }
  }, [authToken]);

  const establishConnection = () => {
    //if token exists, connect to socket
    if (authToken) {
      setSocket(
        io("http://localhost:3001", {
          query: {
            token: authToken,
          },
        })
      );
      //setDecodedToken(jwtDecode(authToken));
      setConnectionEstablished(true);
    }
  };

  const updateConversationList = (conversationId, message, senderId) => {
    const updated = conversationList.map((conversation) => {
      if (conversation.id !== conversationId) return conversation;
      return {
        ...conversation,
        message: message,
        senderName:
          senderId === decodedToken.id ? "You" : conversation.firstName,
      };
    });
    setConversationList(updated);
  };

  const fetchMessages = (conversationId) => {
    return api
      .post(
        "/messages",
        {
          conversationId: conversationId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  };

  const deleteFromConversationList = (conversationId) => {
    const updated = conversationList.filter(
      (conversation) => conversation.id !== conversationId
    );
    setConversationList(updated);
  };

  useEffect(() => {
    if (activeConversationId === -1) return;
    fetchMessages(activeConversationId).then((result) => {
      const messages = result.map((message) => {
        return {
          message: message.message,
          id: message.id,
          isMyMessage: message.senderId === decodedToken.id,
          time: message.time,
        };
      });
      setMessages(messages);
    });
  }, [activeConversationId, decodedToken, setMessages]);

  const fetchConversations = () => {
    api
      .get("/conversations", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        const convList = res.data.map((conversation) => {
          return {
            ...conversation,
            senderName:
              conversation.senderId === decodedToken.id
                ? "You"
                : conversation.senderName,
          };
        });
        setConversationList(convList);
      })
      .catch((err) => {
        console.log(err.response.status); // can create a hook to manage api errors
      });
  };

  useEffect(() => {
    fetchConversations();
  }, [decodedToken]);

  const playSound = () => {
    const audio = new Audio(soundEffect);
    audio.play();
  };

  useEffect(() => {
    if (connectionEstablished) {
      socket.on("receive-message", (message, senderId, conversationId) => {
        playSound();
        if (conversationId === activeConversationId) {
          setMessages(() => [
            ...messages,
            {
              message: message,
              id: message.id,
              isMyMessage: false,
            },
          ]);
        }
        updateConversationList(conversationId, message, senderId);
      });
    }
  }, [
    connectionEstablished,
    socket,
    activeConversationId,
    messages,
    conversationList,
  ]);

  const sendMessage = (message) => {
    socket.emit("send-message", activeConversationId, message);
    setMessages([
      ...messages,
      {
        message: message,
        id: "temporal id:" + Math.random(), // not the actual id, just a temporal id to show the message in the UI
        isMyMessage: true,
      },
    ]);
    updateConversationList(activeConversationId, message, decodedToken.id);
  };

  const changeActiveConversationId = (conversationId) => {
    setActiveConversationId(conversationId);
    setActiveConversationData(
      conversationList.find(
        (conversation) => conversation.id === conversationId
      )
    );
    navigate("/");
  };

  const x = {
    activeConversationData: activeConversationData,
    setActiveConversationId: changeActiveConversationId,
    activeConversationId: activeConversationId,
    conversations: conversationList,
    fetchConversations: fetchConversations,
    establishConnection: establishConnection,
    sendMessage: sendMessage,
    messages: messages,
    deleteFromConversationList: deleteFromConversationList,
  };

  return <SocketContext.Provider value={x}>{children}</SocketContext.Provider>;
}
