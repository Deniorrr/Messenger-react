import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../../contexts/ApiContext";

function Account() {
  const navigate = useNavigate();
  const logoutApi = useContext(ApiContext).logout;

  const logout = () => {
    logoutApi().then(() => {
      navigate("/login");
    });
  };

  return (
    <div>
      <button onClick={() => logout()}>LOGOUT</button>
      Account
    </div>
  );
}

export default Account;
