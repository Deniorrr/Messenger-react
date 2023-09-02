import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import friendsIcon from "../assets/users.svg";
import settingsIcon from "../assets/settings.svg";
import accountIcon from "../assets/portrait.svg";

function Navbar() {
  return (
    <nav>
      <section id="left">Logo</section>
      <section id="center">
        <ul>
          <li>
            <NavLink
              to="/"
              title="Home"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <figure>
                <img src={homeIcon} alt="Home" />
              </figure>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/friends"
              title="Friends"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <figure>
                <img src={friendsIcon} alt="Friends" />
              </figure>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              title="Settings"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <figure>
                <img src={settingsIcon} alt="Settings" />
              </figure>
            </NavLink>
          </li>
        </ul>
      </section>
      <section id="right">
        <NavLink
          to="/account"
          title="Account"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <figure>
            <img src={accountIcon} alt="Account" />
          </figure>
        </NavLink>
      </section>
    </nav>
  );
}

export default Navbar;
