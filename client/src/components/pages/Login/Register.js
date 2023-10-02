import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../style/loginRegister.module.scss";

function Register() {
  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles.form}>
        <h1>Register</h1>
        <div className={styles.names}>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        {/* Maybe accept terms and conditions here? */}
        <button>Register</button>
        <p>
          Already have an account? <NavLink to="/login">Log in now!</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
