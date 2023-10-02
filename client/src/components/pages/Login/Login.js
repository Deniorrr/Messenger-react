import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../style/loginRegister.module.scss";

function Login() {
  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles.form}>
        <h1>Login</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        {/* Maybe forgot passwd here? */}
        <button>Login</button>
        <p>
          No account? <NavLink to="/register">Sign up now!</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
