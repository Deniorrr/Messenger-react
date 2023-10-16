import "./components/style/app.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Aside from "./components/pages/Home/Aside";
import Messenger from "./components/pages/Home/Messenger";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Login/Register";
import Friends from "./components/pages/Friends/Friends";
import FriendsAdd from "./components/pages/Friends/FriendsAdd";
import FriendsList from "./components/pages/Friends/FriendsList";
import FriendsRequests from "./components/pages/Friends/FriendsRequests";

import { ApiProvider } from "./contexts/ApiContext";

function App() {
  const navigate = useNavigate();
  const [conversationId, setConversationId] = useState(0);

  const displayConversation = (conversationId) => {
    setConversationId(conversationId);
    navigate("/");
  };
  return (
    <>
      <div id="container">
        <ApiProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Aside
                    displayConversation={(conversationId) => {
                      displayConversation(conversationId);
                    }}
                  />
                  <Navbar />
                </>
              }
            >
              <Route
                path="/"
                element={<Messenger conversationId={conversationId} />}
              />
              <Route
                path="friends"
                element={
                  <main>
                    <Friends />
                  </main>
                }
              >
                <Route path="" element={<FriendsList />} />
                <Route path="add" element={<FriendsAdd />} />
                <Route path="requests" element={<FriendsRequests />} />
              </Route>
              <Route path="settings" element={<main>settings</main>} />
              <Route path="account" element={<main>account</main>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<main>404</main>} />
          </Routes>
        </ApiProvider>
      </div>
    </>
  );
}

//TODO

//create css modules

// IDEAS

// a todo list for every friendship
// search through friends on aside

export default App;
