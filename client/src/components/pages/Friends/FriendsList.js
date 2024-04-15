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
        console.log("RES", res.data);
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
      {/* <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div> */}
      <div className={styles.friendsList}>
        {friends.map((friend) => {
          return (
            <FriendsListItem key={friend.id} friend={friend} />
            // <div className="friend">
            //   <div className="friend__avatar">
            //     <img src={friend.avatar} alt={friend.name} />
            //   </div>
            //   <div className="friend__name">{friend.firstName}</div>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
