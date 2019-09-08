import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Header extends Component {
  render() {
    return (
      <div>
      <header>
      <nav className="nav-top">
  {/* Created By Bogdan Nagorniy */}
  <div className="logo">
    <h1>
      <a href="index.html">Trello</a>
    </h1>
  </div>
  <ul className="nav_links list-unstyled">
    <li className="nav-link-list">
      <a href="index.html">
        <span className="fa fa-home" />
        <p>Home</p>
      </a>
    </li>
    <li>
    <Link to="/board">
   <a href="/board">
        <span className="fa fa-question" />
        <p>Board</p>
      </a>
    </Link>
    </li>
    <li>
      <a href="#services">
        <span className="fa fa-cog" />
        <p>Services</p>
      </a>
    </li>
    <li>
      <a href="#blog">
        <span className="fa fa-clipboard" />
        <p>Blog</p>
      </a>
    </li>
    <li>
    <Link to = "/login">
    <a href="/login">
        <span className="fa fa-users" />
        <p>Team</p>
      </a>
    </Link>
    </li>
  </ul>
</nav>
</header>
      </div>
    )
  }
}
export default Header
