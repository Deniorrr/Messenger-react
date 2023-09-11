import React from "react";
import { useState } from "react";
import ConversationListSingle from "./ConversationListSingle";
import searchIcon from "../../../assets/search.svg";
import styles from "../../style/aside.module.scss";

function ConversationList(props) {
  // const data = Array(10).fill({
  //   name: "Denis",
  //   surname: "Poczęty",
  //   color: "#ff00ff",
  //   lastMessage: "siema co tam",
  //   timestamp: "30 min",
  //   id: 0,
  // });

  const [activeConversationId, setActiveConversationId] = useState(0);

  const data = [
    {
      name: "Denis",
      surname: "Poczęty",
      color: "#ff00ff",
      lastMessage: "siema co tam",
      timestamp: "30 min",
      id: 1,
    },
    {
      name: "Denis",
      surname: "Poczęty",
      color: "#ff00ff",
      lastMessage: "siema co tam",
      timestamp: "30 min",
      id: 2,
    },
    {
      name: "Denis",
      surname: "Poczęty",
      color: "#ff00ff",
      lastMessage: "siema co tam",
      timestamp: "30 min",
      id: 3,
    },
  ];

  const changeActiveConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    props.displayConversation(conversationId);
  };

  const renderConversationList = () => {
    let elements = data.map((details) => (
      <ConversationListSingle
        displayConversation={(conversationId) =>
          changeActiveConversation(conversationId)
        }
        details={details}
        isActive={details.id === activeConversationId}
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
        <img src={searchIcon}></img>
        <input type="text"></input>
      </div>
      <ul>{renderConversationList()}</ul>
    </div>
  );
}

export default ConversationList;
