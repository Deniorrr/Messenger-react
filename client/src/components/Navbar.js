import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          <Link to="/settings">Friends</Link>
        </li>
        <li>
          <Link to="/account">Friends</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
