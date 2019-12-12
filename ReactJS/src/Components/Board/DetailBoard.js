import React, { Component } from 'react'
import MainBoard from '../Board/MainBoard'
import ListUser from '../User/ListUser';
import IteamHeader from "../IteamHeader";
import HeaderBoard from './HeaderBoard'

export default class DetailBoard extends Component {
  render() {
    return (
      <div className="listProject row">
        <div className="col-12">
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
