import React, { useState } from "react";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
              <div className="friend__name">{friend.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
