// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";

// export const SocketContext = React.createContext();

// export function SocketProvider({ children }) {
//   const [activeConversationId, setActiveConversationId] = useState(-1);
//   const [messages, setMessages] = useState([]);
//   const [conversationList, setConversationList] = useState([]); // for aside

//   useEffect(() => {
//     const socketHelper = socket.current;

//     socketHelper.on("receive-message", (message, senderId) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { senderId: senderId, message: message },
//       ]);
//     });

//     return () => {
//       socketHelper.off("receive-message");
//     };
//   });
//   const APIADDRESS = "http://localhost:3001";
//   const navigate = useNavigate();

//   const x = {};

//   return <SocketContext.Provider value={x}>{children}</SocketContext.Provider>;
// }
