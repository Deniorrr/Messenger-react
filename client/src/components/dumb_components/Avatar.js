import React from "react";
import styles from "../style/friends.module.scss";

function Avatar(props) {
  const firstName = props.friend.firstName;
  const lastName = props.friend.lastName;
  return <div className={styles.avatar}>{firstName[0] + lastName[0]}</div>;
}

export default Avatar;
