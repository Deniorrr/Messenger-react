import React from "react";
import styles from "../style/friends.module.scss";
import Avatar from "./Avatar";

function FriendsListItem(props) {
  const firstName = props.friend.firstName;
  const lastName = props.friend.lastName;
  const email = props.friend.email;
  return (
    <div className={styles.friendsListItem}>
      <div className={styles.avatarWrapper}>
        <Avatar friend={props.friend} />
      </div>
      <div className={styles.personData}>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{email}</p>
      </div>
      <div className={styles.friendActions}>
        <button>Remove</button>
        <button>Message</button>
      </div>
    </div>
  );
}

export default FriendsListItem;
