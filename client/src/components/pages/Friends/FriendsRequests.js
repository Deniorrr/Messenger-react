import React, { useState, useContext, useEffect } from "react";
import api from "../../../api/ApiConfig";
import useAuthToken from "../../../hooks/useAuthToken";
import styles from "../../style/friends.module.scss";
import FriendsListItem from "../../dumb_components/FriendsListItem";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
      <div className={styles.friendsList}>
        {requests.map((request) => {
          console.log(request);
          return (
            // <div className="friend">
            //   <div className="friend__avatar">
            //     <img src={request.avatar} alt={request.name} />
            //   </div>
            //   <div className="friend__name">
            //     {request.firstName} {request.lastName}
            //   </div>
            //   <button
            //     onClick={() => {
            //       acceptRequest(request.id);
            //     }}
            //   >
            //     Accept
            //   </button>
            //   <button
            //     onClick={() => {
            //       rejectRequest(request.id);
            //     }}
            //   >
            //     Reject
            //   </button>
            // </div>
            <FriendsListItem
              key={request.id}
              friend={request}
              buttons={[
                {
                  onClick: () => acceptRequest(request.id),
                  label: "Accept",
                  icon: faCheck,
                },
                {
                  onClick: () => rejectRequest(request.id),
                  label: "Reject",
                  icon: faCheck,
                },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsRequests;
