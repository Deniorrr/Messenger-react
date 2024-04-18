import React, { useState, useContext } from "react";
import useAuthToken from "../../../hooks/useAuthToken";
import api from "../../../api/ApiConfig";
import FriendsListItem from "../../dumb_components/FriendsListItem";
import styles from "../../style/friends.module.scss";
import { faMessage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../../../contexts/SocketContext";

function FriendsList() {
  const [friends, setFriends] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const authToken = useAuthToken();

  const setConversationId = useContext(SocketContext).setActiveConversationId;
  const deleteFromConversationList =
    useContext(SocketContext).deleteFromConversationList;

  const deleteFriend = (friendshipId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this friendship? This will remove all messages and can not be undone."
      )
    )
      api
        .delete("/friends/" + friendshipId, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .then(() => {
          deleteFromConversationList(friendshipId);
          fetchFriends();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const startConversation = (friendshipId) => {
    setConversationId(friendshipId);
  };

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

  const renderUsers = () => {
    if (friends === null) return <p>Loading...</p>;
    if (friends.length === 0) return <p>No friends yet</p>;

    return friends.map((friend) => {
      return (
        <FriendsListItem
          key={friend.id}
          friend={friend}
          removeButton
          messageButton
          buttons={[
            {
              label: "Remove",
              icon: faTrash,
              onClick: () => {
                deleteFriend(friend.id);
              },
            },
            {
              label: "Message",
              icon: faMessage,
              onClick: () => {
                startConversation(friend.id);
              },
            },
          ]}
        />
      );
    });
  };
  return (
    <div>
      <div className={styles["header-wrapper"]}>
        <h2>Friends</h2>
      </div>
      <div className={styles.friendsList}>{renderUsers()}</div>
    </div>
  );
}

export default FriendsList;
