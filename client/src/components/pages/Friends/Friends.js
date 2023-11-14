import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../../style/friends.module.scss";

function Friends() {
  return (
    <>
      <nav id={styles["friendsNavbar"]}>
        <ul>
          <li>
            <NavLink to="/friends">List</NavLink>
          </li>
          <li>
            <NavLink to="/friends/add">Add friend</NavLink>
          </li>
          <li>
            <NavLink to="/friends/requests">Friend requests</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Friends;
