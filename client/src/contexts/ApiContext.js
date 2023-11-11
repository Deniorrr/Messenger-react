import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ApiContext = React.createContext();

export function ApiProvider({ children }) {
  const APIADDRESS = "http://localhost:3001";
  const navigate = useNavigate();

  const checkError = (err) => {
    const status = err.response.status ? err.response.status : err;
    if (status === 401 || status === 403) {
      return navigate("/login");
    }
  };

  const getToken = function () {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      return null;
    }
    return localStorage.getItem("accessToken");
  };
  const x = {
    getToken: getToken,
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
    login: async function (email, password) {
      if (!email || !password) {
        return Promise.reject("Please fill in all fields");
      }
      const res = await axios.post(APIADDRESS + "/login", {
        email: email,
        password: password,
      });
      return res.data;
    },
    logout: async function () {
      //Not an actual api call, but it's a good place to put it
      localStorage.removeItem("accessToken");
      return;
    },
    fetchConversations: async function () {
      return axios
        .get(APIADDRESS + "/conversations", {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        })
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          console.log("XD");
          checkError(err);
        });
    },
    searchUsers: async function (searchInput) {
      const res = await axios
        .get(APIADDRESS + "/search-users?searchInput=" + searchInput, {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        })
        .catch((err) => {
          checkError(err);
        });
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
              Authorization: "Bearer " + getToken(),
            },
          }
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          checkError(err);
        });
      return res.data;
    },
    fetchFriendRequests: async function () {
      const res = await axios
        .get(APIADDRESS + "/friend-requests", {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        })
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          checkError(err);
        });
      return res;
    },
    acceptRequest: async function (requestId) {
      const res = await axios
        .post(
          APIADDRESS + "/accept-request",
          {
            requestId: requestId,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          checkError(err);
        });
      return res;
    },
    rejectRequest: async function (requestId) {
      const res = await axios
        .post(
          APIADDRESS + "/reject-request",
          {
            requestId: requestId,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          checkError(err);
        });
      return res;
    },
    fetchMessages: async function (conversationId) {
      const res = await axios
        .post(
          APIADDRESS + "/messages",
          {
            conversationId: conversationId,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          checkError(err);
        });
      return res;
    },
    sendMessage: async function (conversationId, message) {
      const res = await axios
        .post(
          APIADDRESS + "/send-message",
          {
            conversationId: conversationId,
            message: message,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          checkError(err);
        });
      return res;
    },
  };

  return <ApiContext.Provider value={x}>{children}</ApiContext.Provider>;
}
