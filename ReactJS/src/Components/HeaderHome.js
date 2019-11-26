import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class HeaderHome extends Component {
  render() {
    return (
      <div className="header-home">
        <header>
          <nav className="nav-top">
            {/* Created By Bogdan Nagorniy */}
            <div className="logo">
              <h1>
                <a href="/">
                  <img className="logo-menu" src="/logo-menu.jpg" />
                </a>
              </h1>
            </div>
            <ul className="nav_links list-unstyled">
              <li className="nav-link-list">
                <Link to="/login">
                    <span class="fas fa-sign-in-alt"></span>
                    <p>Login</p>
                </Link>
              </li>
              <li className="nav-link-list">
                <Link to="/register">
                    <span class="fas fa-user-plus"></span>
                    <p>Register</p>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}
