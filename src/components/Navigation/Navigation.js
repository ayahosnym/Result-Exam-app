import React from "react";
import "./Navigation.scss";
import { Link, useHistory } from "react-router-dom";

export default function Navigation() {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/login");
  }
  return (

    <nav >
      <ul className="list-unstyled py-3">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login" onClick={logout}>Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}
