import React, { useState } from "react";
import useAuthToken from "../../../hooks/useAuthToken";
import api from "../../../api/ApiConfig";
import FriendsListItem from "../../dumb_components/FriendsListItem";
import styles from "../../style/friends.module.scss";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const authToken = useAuthToken();

  const fetchFriends = () => {
    api
      .get("/friends", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useState(() => {
    fetchFriends();
  }, []);

  return (
    <div>
      <div className={styles.friendsList}>
        {friends.map((friend) => {
          return (
            <FriendsListItem
              key={friend.id}
              friend={friend}
              removeButton
              messageButton
              buttons={[]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
