import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './ChangeInfoUI'
import * as action from './action'

class ChangeInfoContainer extends Component {
  
  render() {

      return (
        <div >
          <UI infouser={this.props.infouser}/>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth,
      infouser: state.infouser
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfoContainer)