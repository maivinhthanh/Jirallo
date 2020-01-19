import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import ListProjectUI from './ListProjectUI'
import * as action from './action'

class ListProjectContainer extends Component {
  
  render() {

      return (
        <div >
          <ListProjectUI />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListProjectContainer)