import React, { Component } from 'react'
import { connect } from "react-redux"

import MenuUser from '../Components/MenuUser/Menu'
import Issues from '../Components/Issues/Issues'

class HomePage extends Component {

  render() {
    const { match: { params: { idproject, idissues } } } = this.props
    return (
      <div>
        <MenuUser/>
        <Issues idproject = {idproject} idissues={idissues} />
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
)(HomePage)