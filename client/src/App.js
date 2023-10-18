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
//DONE
//nie można dwa razy tego samego maila użyć w bazie
//wyszukiwanie userów

//TODO

//wysyłanie zaproszeń userom
//odbieranie zaproszeń
//akceptowanie zaproszeń //pokaż w liście znajomych
//wyświetlanie errorów w loginie i registerze
//sortuj znajomych po ostatniej wiadomości
//odrzucanie zaproszeń //nic nie rób?
//usuwanie userów
//wygasanie tokenów
//wysyłanie wiadomości
//odbieranie wiadomości
//wyszukiwanie znajomych aside
//blokowanie userów
//widok usera, żeby można było wysłać link do profilu

//zmiana statusu usera //online, offline, away
//zmiana opisu usera
//ustawienie pseudonimu
//ustawienie koloru ikony
//tworzenie grup
//dodawanie do grup
//usuwanie z grup
//usuwanie grup
//zmiana nazwy grup

// IDEAS

// a todo list for every friendship

export default App;
