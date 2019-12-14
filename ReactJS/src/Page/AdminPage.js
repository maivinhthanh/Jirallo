import React, { Component } from 'react'
import Admin from '../Containers/Admin/Admin'
import { connect } from "react-redux"

class AdminPage extends Component {
  render() {
    return (
      <div>
        <Admin/>
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
)(AdminPage);
