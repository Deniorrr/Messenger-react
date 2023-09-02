import "./components/style/app.scss";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aside from "./components/pages/Home/Aside";

function App() {
  return (
    <>
      <Navbar />
      <div id="container">
        <Aside />
        <main>
          <Routes>
            <Route path="/" element={<div>XD</div>}></Route>
            <Route path="/friends" element={<div>friends</div>}></Route>
            <Route path="/settings" element={<div>settings</div>}></Route>
            <Route path="/account" element={<div>account</div>}></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

// IDEAS

// a todo list for every friendship
// search through friends on aside

export default App;
