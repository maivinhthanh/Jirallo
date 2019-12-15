import React, { Component } from 'react'
import { connect } from "react-redux"

import BannerLeft from '../Components/BannerLeft';
import MenuUser from '../Components/MenuUser/Menu'

class UserPage extends Component {
  render() {
    return (
      <div>
        <MenuUser/>
        <BannerLeft/>
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
)(UserPage)
