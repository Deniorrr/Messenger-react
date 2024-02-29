import React from "react";
import { useNavigate } from "react-router-dom";
// import { ApiContext } from "../../../contexts/ApiContext";

function Account() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={() => logout()}>LOGOUT</button>
      Account
    </div>
  );
}

export default Account;
