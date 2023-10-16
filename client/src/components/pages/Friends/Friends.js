import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Friends() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/friends">List</NavLink>
          </li>
          <li>
            <NavLink to="/friends/add">Add friend</NavLink>
          </li>
          <li>
            <NavLink to="/friends/requests">Friend requests</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Friends;
