import React from "react";
import { useState } from "react";
import ConversationList from "./ConversationList";
import arrowIcon from "../../../assets/arrow.svg";
import styles from "../../style/aside.module.scss";

function Aside() {
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
        <button onClick={() => changeAsideVisibility()}>
          <img src={arrowIcon} alt="arrow Icon" />
        </button>
      </div>
      <ConversationList
        changeAsideVisibility={() => setAsideVisibility(false)}
      />
    </aside>
  );
}

export default Aside;
