import React, { useState, useContext, useEffect } from "react";
import api from "../../../api/ApiConfig";
import useAuthToken from "../../../hooks/useAuthToken";

function FriendsRequests() {
  const [requests, setRequests] = useState([]);
  const authToken = useAuthToken();
  // const fetchFriendRequests = useContext(ApiContext).fetchFriendRequests;
  //const acceptRequest = useContext(ApiContext).acceptRequest;
  //const rejectRequest = useContext(ApiContext).rejectRequest;

  const acceptRequest = (requestId) => {
    api
      .post(
        "/accept-request",
        { requestId: requestId },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then(() => {
        setRequests(requests.filter((request) => request.id !== requestId));
      });
  };

  const rejectRequest = (requestId) => {
    api
      .post(
        "/reject-request",
        { requestId: requestId },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then(() => {
        setRequests(requests.filter((request) => request.id !== requestId));
      });
  };

  useEffect(() => {
    api
      .get("/friend-requests", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((res) => {
        console.log(res);
        setRequests(res.data);
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
