import React, { Component } from 'react'
import { connect } from "react-redux"

import Header from '../Components/Header';
import ProfileDetail from '../Components/Project/profileDetail'
import MenuUser from '../Components/MenuUser/Menu'

class ProfileProject extends Component {
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div>
      <MenuUser/>
      <ProfileDetail params = {id}/>
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
)(ProfileProject)
