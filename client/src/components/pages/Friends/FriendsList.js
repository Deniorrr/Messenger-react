import React, { useState, useContext } from "react";
import useAuthToken from "../../../hooks/useAuthToken";
import api from "../../../api/ApiConfig";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const authToken = useAuthToken();
  //const fetchFriends = useContext(ApiContext).fetchFriends;

  const fetchFriends = () => {
    api
      .get("/friends", {
        headers: {
          Authorization: "Bearer " + authToken(),
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
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="friends">
        {friends.map((friend) => {
          console.log(friend);
          return (
            <div className="friend">
              <div className="friend__avatar">
                <img src={friend.avatar} alt={friend.name} />
              </div>
              <div className="friend__name">{friend.firstName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
