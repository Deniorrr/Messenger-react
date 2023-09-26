import React from "react";
import styles from "../../style/loginRegister.module.scss";

function Register() {
  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles.form}>
        <h1>Register</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;
