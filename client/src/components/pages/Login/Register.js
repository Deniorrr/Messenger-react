import { React, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../style/loginRegister.module.scss";
import { ApiContext } from "../../../contexts/ApiContext";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");

  const registerApi = useContext(ApiContext).register;

  const register = () => {
    registerApi(firstName, lastName, email, password, confirmPasswd)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return alert(err);
      });
  };

  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles.form}>
        <h1>Register</h1>
        <div className={styles.names}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPasswd}
          onChange={(e) => setConfirmPasswd(e.target.value)}
        />
        {/* Maybe accept terms and conditions here? */}
        <button
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
        <p>
          Already have an account? <NavLink to="/login">Log in now!</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
