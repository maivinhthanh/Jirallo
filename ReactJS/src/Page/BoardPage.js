import React, { Component } from 'react'
import { connect } from "react-redux"

import Board from '../Components/Board/Board';

class BoardPage extends Component {
  
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div>
        <Board params = {id}/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  null
)(BoardPage)
