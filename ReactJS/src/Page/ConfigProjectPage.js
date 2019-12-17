import React, { Component } from 'react'
import { connect } from "react-redux"

import MenuUser from '../Components/MenuUser/Menu'
import ConfigProject from '../Components/Project/ConfigProject'

class ConfigProjectPage extends Component {

  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div>
        <MenuUser/>
        <ConfigProject params={id}/>
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
)(ConfigProjectPage)