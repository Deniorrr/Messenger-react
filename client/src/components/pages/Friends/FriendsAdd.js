import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthToken from "../../../hooks/useAuthToken";
import styles from "../../style/friends.module.scss";
import {
  faSpinner,
  faCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../../api/ApiConfig";
import FriendsListItem from "../../dumb_components/FriendsListItem";

function FriendsAdd() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const authToken = useAuthToken();

  const searchUsers = () => {
    api
      .get("/search-users?searchInput=" + searchInput, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((res) => {
        let data = res.data;
        data.forEach((user) => {
          user.added = false;
        });
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const search = () => {
  //   searchUsers(searchInput).then((data) => {
  //     //for each user, set a value if user added or not
  //     data.forEach((user) => {
  //       user.added = false;
  //     });
  //     console.log(data);
  //     setUsers(data);
  //   });
  // };

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
    api
      .post(
        "/add-friend",
        { userId: userId },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then(() => {
        changeRequestStatus(userId, true);
      })
      .catch((error) => {
        console.log("Request failed", error);
        changeRequestStatus(userId, false);
      });
  };

  const getButtonStyle = (user) => {
    if (user.added === "loading") {
      return faSpinner;
    } else if (user.added) {
      return faCheck;
    } else {
      return faUserPlus;
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
        <button onClick={() => searchUsers()}>Search</button>
      </div>
      <div className={styles.friendsList}>
        {users.map((user) => {
          return (
            // <div className="user">
            //   <div className="user__avatar">
            //     {user.firstName[0] + user.lastName[0]}
            //     {/* <img src={} alt={user.name} /> */}
            //   </div>
            //   <div className="user__name">
            //     {user.firstName + " " + user.lastName}
            //   </div>
            //   <button
            //     onClick={() => {
            //       addFriend(user.id);
            //     }}
            //   >
            //     {renderButtonStyle(user.added)}
            //   </button>
            // </div>
            <FriendsListItem
              key={user.id}
              friend={user}
              buttons={[
                {
                  label: "Add Friend",
                  icon: getButtonStyle(user),
                  onClick: () => addFriend(user.id),
                },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsAdd;
