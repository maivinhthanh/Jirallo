import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import * as Config from '../Config';

export default class IteamHeader extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div>
        <ul className="nav_links list-unstyled">
          <li>
            <Link to="/viewAll">
              <span className="fas fa-home" />
              <p>Home</p>
            </Link>
            </li>
            {/* <li className="nav-link-list">
              <a href="index.html">
                <span className="fas fa-home" />
                <p>Home</p>
              </a>
            </li>
            <li> */}
            <li>
              <Link to="/board">
                  <span className="fas fa-columns"></span>
                  <p>ActiveSprint</p>
              </Link>
            </li>
            <li>
              <a href="#services">
                <span className="fas fa-cog" />
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
              <a href="#user">
                  <img className="avatar-image" src={!user.avatar? user.avatar : Config.API_URL  + "/" + user.image} height={96} width={96}/>
              </a>
            </li>
          </ul>
      </div>
    )
  }
}
