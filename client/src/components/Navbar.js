import React, { useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./style/navbar.module.scss";
import { SocketContext } from "../contexts/SocketContext";

function Navbar() {
  const navigate = useNavigate();

  const establishConnection = useContext(SocketContext).establishConnection;

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    establishConnection();
  }, [navigate]);

  return (
    <>
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
            className={({ isActive }) =>
              isActive ? styles["active-link"] : ""
            }
          >
            <figure
              className={`${styles["svg-icon"]} ${styles["account-icon"]}`}
            ></figure>
          </NavLink>
        </section>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
