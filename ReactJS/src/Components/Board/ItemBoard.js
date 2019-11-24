import React, { Component } from 'react'
import MainBoard from '../Board/MainBoard'
export default class ItemBoard extends Component {
  render() {
    return (
      <MainBoard project={this.props.project}/>
    )
  }
}
