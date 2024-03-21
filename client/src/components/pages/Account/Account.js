import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../../../hooks/useAuthToken";

function Account() {
  const navigate = useNavigate();
  const authToken = useAuthToken();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={() => logout()}>LOGOUT</button>
      <h1>Account</h1>
      <p>{authToken}</p>
    </div>
  );
}

export default Account;
