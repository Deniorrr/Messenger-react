import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../../style/friends.module.scss";

function Friends() {
  return (
    <>
      <div id={styles["navbarWrapper"]}>
        <nav id={styles["friendsNavbar"]}>
          <ul>
            <li>
              <NavLink
                to="/friends"
                end //to be active only when the link is an exact match
                className={({ isActive }) =>
                  isActive ? styles["active-link"] : ""
                }
              >
                Friends
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/friends/add"
                className={({ isActive }) =>
                  isActive ? styles["active-link"] : ""
                }
              >
                Add friends
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/friends/requests"
                className={({ isActive }) =>
                  isActive ? styles["active-link"] : ""
                }
              >
                Friend requests
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default Friends;
