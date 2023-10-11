import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../style/loginRegister.module.scss";
import axios from "axios";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data);
        console.log(res);
      });
  };

  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles.form}>
        <h1>Login</h1>
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
        {/* Maybe forgot passwd here? */}
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        <p>
          No account? <NavLink to="/register">Sign up now!</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
