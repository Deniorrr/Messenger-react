import React from "react";
import { useState } from "react";
import ConversationList from "./ConversationList";
import styles from "../../style/aside.module.scss";

function Aside(props) {
  const [isAsideHidden, setIsAsideHidden] = useState(false);

  const changeAsideVisibility = () => {
    setIsAsideHidden(!isAsideHidden);
  };
  const setAsideVisibility = (value) => {
    if (typeof value == "boolean") setIsAsideHidden(value);
  };
  return (
    <aside className={styles.aside} id={isAsideHidden ? styles.hidden : ""}>
      <div className={styles["button-wrapper"]}>
        <button onClick={() => changeAsideVisibility()}>SZ</button>
      </div>
      <ConversationList
        displayConversation={(conversationId) => {
          props.displayConversation(conversationId);
        }}
        changeAsideVisibility={() => setAsideVisibility(false)}
      />
    </aside>
  );
}

export default Aside;
