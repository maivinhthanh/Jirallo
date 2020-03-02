import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid } from '@material-ui/core'

import IssueUI from './IssueUI'
import * as action from './action'

class IssueContainer extends Component {
  componentWillUpdate(nextProps, nextState, snapshot) {
    
  }

  render() {
      const {  issues } = this.props
      console.log(issues)
      return (
        <div >
          <IssueUI issue={issues}/>
          
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      issues: state.issues
    }
}

const mapDispatchToProps = dispatch => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueContainer)