import React from "react";
import styles from "../style/friends.module.scss";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FriendsListItem(props) {
  const firstName = props.friend.firstName;
  const lastName = props.friend.lastName;
  const email = props.friend.email;

  const buttons = props.buttons;

  return (
    <div className={styles["friends-list-item"]}>
      <div className={styles["friend-wrapper"]}>
        <div className={styles["avatar-wrapper"]}>
          <Avatar friend={props.friend} />
        </div>
        <div className={styles.personData}>
          <h3>
            {firstName} {lastName}
          </h3>
          <p>{email}</p>
        </div>
      </div>
      <div className={styles["friend-buttons"]}>
        {buttons.map((button, index) => (
          <button key={index} onClick={button.onClick} title={button.label}>
            <FontAwesomeIcon icon={button.icon} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default FriendsListItem;
