import React, { Component } from 'react'
import MainBoard from '../Board/MainBoard'
import HeaderBoard from './HeaderBoard'

export default class DetailBoard extends Component {
  render() {
    return (
      <div className="listProject row">
        <div className="col-12">
          <HeaderBoard/>
          <MainBoard params={this.props.params}/>
        </div>
      </div>
    )
  }
}
