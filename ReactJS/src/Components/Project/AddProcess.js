import React, { Component } from 'react'
import { connect } from "react-redux"

class AddProcess extends Component {

  render() {
    const { params } = this.props
    return (
      <div>
          Add Process
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
)(AddProcess)