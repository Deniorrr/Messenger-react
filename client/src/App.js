import "./components/style/app.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Aside from "./components/pages/Home/Aside";
import Messenger from "./components/pages/Home/Messenger";

function App() {
  const navigate = useNavigate();
  const [conversationId, setConversationId] = useState(0);

  const displayConversation = (conversationId) => {
    setConversationId(conversationId);
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div id="container">
        <Aside
          displayConversation={(conversationId) => {
            displayConversation(conversationId);
          }}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Messenger conversationId={conversationId} />}
            ></Route>
            <Route path="/friends" element={<div>friends</div>}></Route>
            <Route path="/settings" element={<div>settings</div>}></Route>
            <Route path="/account" element={<div>account</div>}></Route>
          </Routes>
        </main>
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
