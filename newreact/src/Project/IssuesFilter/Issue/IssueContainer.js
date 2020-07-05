import React, { Component } from 'react'
import { connect } from 'react-redux'

import IssueUI from './IssueUI'
import * as action from './action'

class IssueContainer extends Component {
  
  EditDescriptIssues = (data) =>{
    this.props.EditDescriptIssues(this.props.issues._id, data)
  }

  render() {
      const { issues } = this.props
      return (
        <div >
          <IssueUI issue={issues}
          EditDescriptIssues={this.EditDescriptIssues}/> 
          
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
      EditDescriptIssues: (id, data) => dispatch(action.EditDescriptIssues(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueContainer)