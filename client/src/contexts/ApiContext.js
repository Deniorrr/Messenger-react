import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ApiContext = React.createContext();

export function ApiProvider({ children }) {
  const APIADDRESS = "http://localhost:3001";
  const navigate = useNavigate();

  const x = {
    register: async (firstName, lastName, email, password, confirmPasswd) => {
      if (!firstName || !lastName || !email || !password || !confirmPasswd) {
        return Promise.reject("Please fill in all fields");
      }

      if (password !== confirmPasswd) {
        return Promise.reject("Passwords do not match");
      }
      try {
        const res = await axios.post(APIADDRESS + "/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        return res.data;
      } catch (err) {
        throw err.response.data;
      }
    },
    login: async (email, password) => {
      if (!email || !password) {
        return Promise.reject("Please fill in all fields");
      }
      const res = await axios.post(APIADDRESS + "/login", {
        email: email,
        password: password,
      });
      return res.data;
    },
    logout: async () => {
      //Not an actual api call, but it's a good place to put it
      localStorage.removeItem("accessToken");
      return Promise.resolve();
    },

    fetchConversations: async () => {
      const res = await axios.get(APIADDRESS + "/conversations", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return Promise.resolve(res.data);
    },
    searchUsers: async (searchInput) => {
      const res = await axios.get(
        APIADDRESS + "/search-users?searchInput=" + searchInput,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      return res.data;
    },
    addFriend: async (userId) => {
      const res = await axios
        .post(
          APIADDRESS + "/add-friend",
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject(err.response.data);
        });
      return res.data;
    },
    fetchFriendRequests: async () => {
      const res = await axios
        .get(APIADDRESS + "/friend-requests", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject("something went wrong");
        });
      return res;
    },
    acceptRequest: async (requestId) => {
      const res = await axios
        .post(
          APIADDRESS + "/accept-request",
          {
            requestId: requestId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject("something went wrong");
        });
      return res;
    },
    rejectRequest: async (requestId) => {
      const res = await axios
        .post(
          APIADDRESS + "/reject-request",
          {
            requestId: requestId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject("something went wrong");
        });
      return res;
    },
    fetchMessages: async (conversationId) => {
      const res = await axios
        .post(
          APIADDRESS + "/messages",
          {
            conversationId: conversationId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject("something went wrong");
        });
      return res;
    },
    sendMessage: async (conversationId, message) => {
      const res = await axios
        .post(
          APIADDRESS + "/send-message",
          {
            conversationId: conversationId,
            message: message,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject("something went wrong");
        });
      return res;
    },
  };

  return <ApiContext.Provider value={x}>{children}</ApiContext.Provider>;
}
