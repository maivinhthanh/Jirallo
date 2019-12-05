import React, { Component } from 'react'
import { connect } from "react-redux"

import Headers from '../Components/Header';
import BannerLeft from '../Components/BannerLeft';

class UserPage extends Component {
  render() {
    return (
      <div>
        <Headers/>
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
