import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import * as Config from '../Config';
import SettingUser from './SettingUser'

export default class IteamHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      status : true
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   return user === null;
  // }
  render() {
    let user = JSON.parse(localStorage.getItem('user'))
    const idproject = localStorage.getItem('idproject')
    if(user === null){
      user = {image : null}
    }
    return (
      <div>
        <ul className="nav_links list-unstyled">
            <li>
              <Link to="/viewAll">
                <span className="fas fa-home" />
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: `/board/${idproject}` }}>
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
              <a id='Popover-avatar'>
                  <img className="avatar-image" src={user.image !== null? Config.API_URL  + "/" + user.image : user.avatar} height={96} width={96}/>
              </a>
              
            </li>
          </ul>
          <SettingUser name={user.name}/>
      </div>
    )
  }
}
