import React, { useState, useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function FriendsAdd() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchUsers = useContext(ApiContext).searchUsers;
  const addFriendApi = useContext(ApiContext).addFriend;

  const search = () => {
    searchUsers(searchInput).then((data) => {
      //for each user, set a value if user added or not
      data.forEach((user) => {
        user.added = false;
      });
      console.log(data);
      setUsers(data);
    });
  };

  const changeRequestStatus = (userId, status) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          user.added = status;
        }
        return user;
      })
    );
  };

  const addFriend = (userId) => {
    changeRequestStatus(userId, "loading");
    addFriendApi(userId)
      .then((data) => {
        changeRequestStatus(userId, true);
      })
      .catch((error) => {
        console.log("Request failed", error);
        changeRequestStatus(userId, false);
      });
  };

  const renderButtonStyle = (added) => {
    if (added === "loading") {
      return <FontAwesomeIcon icon={faSpinner} />;
    } else if (added) {
      return <FontAwesomeIcon icon={faCheck} />;
    } else {
      return <FontAwesomeIcon icon={faUserPlus} />;
    }
  };
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={() => search()}>Search</button>
      </div>
      <div className="result">
        {users.map((user) => {
          return (
            <div className="user">
              <div className="user__avatar">
                {user.firstName[0] + user.lastName[0]}
                {/* <img src={} alt={user.name} /> */}
              </div>
              <div className="user__name">
                {user.firstName + " " + user.lastName}
              </div>
              <button
                onClick={() => {
                  addFriend(user.id);
                }}
              >
                {renderButtonStyle(user.added)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsAdd;
