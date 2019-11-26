import React, { Component } from 'react'
import MainBoard from '../Board/MainBoard'
import ListUser from '../User/ListUser';
import IteamHeader from "../IteamHeader";
import HeaderBoard from './HeaderBoard'

export default class DetailBoard extends Component {
  render() {
    return (
      <div className="listProject row">
        <nav className="nav-top">
          <div className="logo">
            <h1>
              <a href="/">
                <img className="logo-menu" src="/logo-menu.jpg" />
              </a>
            </h1>
          </div>
          <IteamHeader/>
        </nav>
        <div className="col-1"></div>
        <div className="col-11">
          <HeaderBoard/>
          <div className="filter">
            <ListUser params={this.props.params}/>
          </div>
          <MainBoard params={this.props.params}/>
        </div>
      </div>
    )
  }
}
