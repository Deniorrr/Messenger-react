import React from "react";
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
  return (
    <div id={styles["conversation-list"]}>
      <div className={styles["search-bar"]}>
        <figure>
          <img src={searchIcon}></img>
        </figure>
        <input type="text"></input>
      </div>
      {data.map((details) => (
        <ConversationListSingle
          displayConversation={(conversationId) =>
            props.displayConversation(conversationId)
          }
          details={details}
        />
      ))}
    </div>
  );
}

export default ConversationList;
