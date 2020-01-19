import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import HeaderUI from './HeaderUI'

class HeaderContainer extends Component {
  
  render() {

      return (
        <div >
          <HeaderUI />
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)