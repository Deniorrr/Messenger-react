import React from "react";
import { useState, useEffect, useContext } from "react";
import ConversationListSingle from "./ConversationListSingle";
import searchIcon from "../../../assets/search.svg";
import styles from "../../style/aside.module.scss";
import { ApiContext } from "../../../contexts/ApiContext";

function ConversationList(props) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchConversations = useContext(ApiContext).fetchConversations;

  useEffect(() => {
    fetchConversations().then((x) => setData(x));
  }, []);

  useEffect(() => {
    let filtered = data.filter((x) => {
      let fullName = x.firstName + " " + x.lastName;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(filtered);
  }, [data, search]);

  const [activeConversationId, setActiveConversationId] = useState(0);

  const changeActiveConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    props.displayConversation(conversationId);
  };

  const renderConversationList = () => {
    if (data === null) return <div>Loading...</div>;
    let elements = filteredData.map((details) => (
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
        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
      </div>
      <ul>{renderConversationList()}</ul>
    </div>
  );
}

export default ConversationList;
