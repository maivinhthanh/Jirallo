import React, { Component } from 'react'
import { connect } from "react-redux"

class AddMember extends Component {

  render() {
    const { params } = this.props
    return (
      <div>
          Add Member
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
)(AddMember)