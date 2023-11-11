import React from "react";
import { useState, useEffect, useContext } from "react";
import ConversationListSingle from "./ConversationListSingle";
import searchIcon from "../../../assets/search.svg";
import styles from "../../style/aside.module.scss";
import { ApiContext } from "../../../contexts/ApiContext";

function ConversationList(props) {
  const [data, setData] = useState([]);

  const fetchConversations = useContext(ApiContext).fetchConversations;

  useEffect(() => {
    fetchConversations().then((x) => setData(x));
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
