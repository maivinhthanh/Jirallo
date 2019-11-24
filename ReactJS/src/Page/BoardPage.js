import React, { Component } from 'react'
import Board from '../Components/Board/Board';

export default class BoardPage extends Component {
  
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div>
        <Board params = {id}/>
      </div>
    )
  }
}
