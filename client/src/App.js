import "./components/style/app.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Aside from "./components/pages/Home/Aside";
import Messenger from "./components/pages/Home/Messenger";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Login/Register";

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
            <Route path="friends" element={<main>friends</main>} />
            <Route path="settings" element={<main>settings</main>} />
            <Route path="account" element={<main>account</main>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<main>404</main>} />
        </Routes>
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
