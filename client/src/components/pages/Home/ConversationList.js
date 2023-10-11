import React from "react";
import { useState, useEffect } from "react";
import ConversationListSingle from "./ConversationListSingle";
import searchIcon from "../../../assets/search.svg";
import styles from "../../style/aside.module.scss";
import axios from "axios";

function ConversationList(props) {
  // const data = Array(10).fill({
  //   name: "Denis",
  //   surname: "Poczęty",
  //   color: "#ff00ff",
  //   lastMessage: "siema co tam",
  //   timestamp: "30 min",
  //   id: 0,
  // });
  const [data, setData] = useState(null);

  const fetchConversations = async () => {
    const res = await axios.get("http://localhost:3001/conversations", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const [activeConversationId, setActiveConversationId] = useState(0);

  // const data = [
  //   {
  //     name: "Denis",
  //     surname: "Poczęty",
  //     color: "#ff00ff",
  //     lastMessage: "siema co tam",
  //     timestamp: "12:30",
  //     id: 1,
  //   },
  //   {
  //     name: "Denis",
  //     surname: "Poczęty",
  //     color: "#ff00ff",
  //     lastMessage: "siema co tam",
  //     timestamp: "12:30",
  //     id: 2,
  //   },
  //   {
  //     name: "Denis",
  //     surname: "Poczęty",
  //     color: "#ff00ff",
  //     lastMessage: "siema co tam",
  //     timestamp: "12:30",
  //     id: 3,
  //   },
  // ];

  const changeActiveConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    props.displayConversation(conversationId);
  };

  const renderConversationList = () => {
    if (data === null) return <div>Loading...</div>;
    let elements = data.map((details) => (
      <ConversationListSingle
        displayConversation={(conversationId) =>
          changeActiveConversation(conversationId)
        }
        details={details}
        isActive={details.conversationId === activeConversationId}
      />
    ));
    return elements;
  };

  return (
    <div id={styles["conversation-list"]}>
      <div
        className={styles["search-bar"]}
        onClick={() => props.changeAsideVisibility()}
      >
        <img src={searchIcon} alt="searchIcon"></img>
        <input type="text"></input>
      </div>
      <ul>{renderConversationList()}</ul>
    </div>
  );
}

export default ConversationList;
