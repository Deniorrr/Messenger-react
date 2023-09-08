import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import friendsIcon from "../assets/users.svg";
import settingsIcon from "../assets/settings.svg";
import accountIcon from "../assets/portrait.svg";
import styles from "./style/navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <section id="left">Logo</section>
      <section id="center">
        <ul>
          <li>
            <NavLink
              to="/"
              title="Home"
              className={({ isActive }) =>
                isActive ? styles["active-link"] : ""
              }
            >
              <figure
                className={`${styles["svg-icon"]} ${styles["home-icon"]}`}
              ></figure>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/friends"
              title="Friends"
              className={({ isActive }) =>
                isActive ? styles["active-link"] : ""
              }
            >
              <figure
                className={`${styles["svg-icon"]} ${styles["friends-icon"]}`}
              ></figure>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              title="Settings"
              className={({ isActive }) =>
                isActive ? styles["active-link"] : ""
              }
            >
              <figure
                className={`${styles["svg-icon"]} ${styles["settings-icon"]}`}
              ></figure>
            </NavLink>
          </li>
        </ul>
      </section>
      <section id="right">
        <NavLink
          to="/account"
          title="Account"
          className={({ isActive }) => (isActive ? styles["active-link"] : "")}
        >
          <figure
            className={`${styles["svg-icon"]} ${styles["account-icon"]}`}
          ></figure>
        </NavLink>
      </section>
    </nav>
  );
}

export default Navbar;
