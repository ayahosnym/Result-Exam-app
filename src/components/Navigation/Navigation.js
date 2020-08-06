import React from "react";
import "./Navigation.css";
import { Link, useHistory } from "react-router-dom";

export default function Navigation() {
  const history = useHistory();
  
  function logout() {
    localStorage.clear();
    history.push("/login");
  }
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="profile">profile</Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              {" "}
              logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
