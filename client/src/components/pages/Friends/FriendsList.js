import React, { useState, useContext } from "react";
import { ApiContext } from "../../../contexts/ApiContext";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const fetchFriends = useContext(ApiContext).fetchFriends;

  useState(() => {
    fetchFriends().then((res) => {
      console.log(res);
      setFriends(res);
    });
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
