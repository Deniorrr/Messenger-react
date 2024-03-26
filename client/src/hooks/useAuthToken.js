//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthToken() {
  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    } else {
      return token;
    }
  };
  // const token = localStorage.getItem("accessToken");
  // useEffect(() => {

  // }, [navigate]);

  return getToken();
}
