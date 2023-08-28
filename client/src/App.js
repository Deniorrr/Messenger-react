import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>XD</div>}></Route>
        <Route path="/friends" element={<div>friends</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
