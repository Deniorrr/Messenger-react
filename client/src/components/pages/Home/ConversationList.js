import React from "react";
import { useState, useEffect, useContext } from "react";
import ConversationListSingle from "./ConversationListSingle";
import searchIcon from "../../../assets/search.svg";
import styles from "../../style/aside.module.scss";
import { SocketContext } from "../../../contexts/SocketContext";

function ConversationList(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const activeConversationId = useContext(SocketContext).activeConversationId;
  const data = useContext(SocketContext).conversations;

  useEffect(() => {
    let filtered = data.filter((x) => {
      let fullName = x.firstName + " " + x.lastName;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(filtered);
  }, [data, search]);

  const renderConversationList = () => {
    if (data === null) return <div>Loading...</div>;
    let elements = filteredData.map((details) => (
      <ConversationListSingle
        key={details.id}
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
        <img src={searchIcon} alt="searchIcon"></img>
        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
      </div>
      <ul>{renderConversationList()}</ul>
    </div>
  );
}

export default ConversationList;
