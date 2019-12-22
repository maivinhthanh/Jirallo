import React, { Component } from 'react'
import DetailBoard from './DetailBoard'

class Board extends Component {
  
  render() {
    return (
      <div>
        <DetailBoard params={this.props.params}/>
      </div>
    )
  }
}

export default Board
