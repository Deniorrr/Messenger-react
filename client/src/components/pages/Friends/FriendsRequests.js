import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../../contexts/ApiContext";

function FriendsRequests() {
  const [requests, setRequests] = useState([]);

  const fetchFriendRequests = useContext(ApiContext).fetchFriendRequests;
  const acceptRequest = useContext(ApiContext).acceptRequest;
  const rejectRequest = useContext(ApiContext).rejectRequest;

  useEffect(() => {
    fetchFriendRequests().then((res) => {
      console.log(res);
      setRequests(res);
    });
  }, []);

  return (
    <div>
      <div className="friends">
        {requests.map((request) => {
          return (
            <div className="friend">
              <div className="friend__avatar">
                <img src={request.avatar} alt={request.name} />
              </div>
              <div className="friend__name">
                {request.firstName} {request.lastName}
              </div>
              <button
                onClick={() => {
                  acceptRequest(request.id);
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  rejectRequest(request.id);
                }}
              >
                Reject
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsRequests;
