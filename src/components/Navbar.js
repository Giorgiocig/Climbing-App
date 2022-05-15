import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function navbar() {
  return (
    <div className="navbar">
      <nav className="row flex-sb align-center">
        <p>DataBase Climbing</p>
        <ul>
          <li>
            <Link to="/">
              <p>Home</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
