import React from "react";
import styles from "../../style/titleScreen.module.scss";
import {
  faGithub,
  faReact,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/app-logo-transparent.png";

function TitleScreen() {
  return (
    <main className={styles["welcome-wrapper"]}>
      <section className={styles["welcome-section"]}>
        <header>
          <h1>
            Welcome to
            {/* <span className={styles["title-orange"]}>Socket</span>
            <span className={styles["title-blue"]}>Link</span> */}
          </h1>
          <figure>
            <img src={logo} alt="Socket Link logo" />
          </figure>
        </header>

        <p>
          Socket link is a messaging app that allows you to chat with your
          friends in real time. By using React, Node.js, Express, and Socket.io
          we are able to create a seamless experience for you to connect with
          your friends.
        </p>
        <div className={styles["icons"]}>
          <FontAwesomeIcon icon={faReact} />
          <FontAwesomeIcon icon={faNodeJs} />
        </div>
        <p>
          Additionally your password is encrypted. It's so safe, that even if
          you forget your password, you won't be able to recover it, because the
          backend isn't connected to mailing services to send you a new
          password.
        </p>
        <div className={styles["icons"]}>
          <FontAwesomeIcon icon={faGithub} />
        </div>
        <p>
          More about this and other projects on my{" "}
          <a href="https://github.com/Deniorrr">GitHub</a>.
        </p>
      </section>
      <footer>&copy; Denis Poczęty 2024</footer>
    </main>
  );
}

export default TitleScreen;
