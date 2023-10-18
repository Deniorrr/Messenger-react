import React, { useState } from "react";

function FriendsRequests() {
  const [friends, setFriends] = useState([]);
  return (
    <div>
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

export default FriendsRequests;
