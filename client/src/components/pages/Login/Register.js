import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../style/loginRegister.module.scss";
import axios from "axios";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");

  const register = () => {
    if (!firstName || !lastName || !email || !password || !confirmPasswd) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPasswd) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3001/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
