import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../style/loginRegister.module.scss";
//import axios from "axios";
import { ApiContext } from "../../../contexts/ApiContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginApi = useContext(ApiContext).login;
  const login = () => {
    loginApi(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles.form}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
