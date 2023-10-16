import React from "react";
import axios from "axios";

export const ApiContext = React.createContext();

// export function useApi() {
//   return useContext(ApiContext);
// }

export function ApiProvider({ children }) {
  const x = {
    fetchConversations: async () => {
      const res = await axios.get("http://localhost:3001/conversations", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return res.data;
    },

    register: async (firstName, lastName, email, password, confirmPasswd) => {
      if (!firstName || !lastName || !email || !password || !confirmPasswd) {
        return Promise.reject("Please fill in all fields");
      }

      if (password !== confirmPasswd) {
        return Promise.reject("Passwords do not match");
      }
      const res = await axios.post("http://localhost:3001/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      return res.data;
    },
    login: async (email, password) => {
      if (!email || !password) {
        return Promise.reject("Please fill in all fields");
      }
      const res = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      return res.data;
    },
  };

  return <ApiContext.Provider value={x}>{children}</ApiContext.Provider>;
}
