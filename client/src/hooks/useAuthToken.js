//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthToken() {
  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return navigate("/login");
    } else {
      return token;
    }
  };
  // const token = localStorage.getItem("accessToken");
  // useEffect(() => {

  // }, [navigate]);

  return getToken();
}
