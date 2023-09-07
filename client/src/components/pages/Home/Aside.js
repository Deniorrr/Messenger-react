import React from "react";
import ConversationList from "./ConversationList";
import styles from "../../style/aside.module.scss";

function Aside(props) {
  return (
    <aside className={styles.aside}>
      <button>responsywny buton</button>
      <ConversationList
        displayConversation={(conversationId) => {
          props.displayConversation(conversationId);
        }}
      />
    </aside>
  );
}

export default Aside;
