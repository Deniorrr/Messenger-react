import React, { useState, useEffect } from "react";
import api from "../../../api/ApiConfig";
import useAuthToken from "../../../hooks/useAuthToken";
import styles from "../../style/friends.module.scss";
import FriendsListItem from "../../dumb_components/FriendsListItem";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function FriendsRequests() {
  const [requests, setRequests] = useState(null);
  const authToken = useAuthToken();

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

  const renderRequestsList = () => {
    if (requests === null) return <div>Loading...</div>;
    if (requests.length === 0) return <div>No friend requests</div>;
    return requests.map((request) => {
      console.log(request);
      return (
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
              icon: faXmark,
            },
          ]}
        />
      );
    });
  };

  return (
    <div className={styles["friends-section"]}>
      <div className={styles["header-wrapper"]}>
        <h2>Friend requests</h2>
      </div>
      <div className={styles.friendsList}>{renderRequestsList()}</div>
    </div>
  );
}

export default FriendsRequests;
