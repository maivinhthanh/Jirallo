import React, { Component } from 'react'
import { connect } from 'react-redux'

import IssueUI from './IssueUI'
import * as action from './action'

class IssueContainer extends Component {
  
  EditDescriptIssues = (data) =>{
    this.props.EditDescriptIssues(this.props.issues._id, data)
  }

  EditAssignee = (iduser) =>{
    console.log(iduser)
    this.props.AssignforUser(this.props.issues._id, iduser)
  }

  render() {
      const { issues, listMember } = this.props
      return (
        <div >
          <IssueUI issue={issues} listMember={listMember}
            EditDescriptIssues={this.EditDescriptIssues}
            EditAssignee={this.EditAssignee}/> 
          
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      issues: state.issues,
      listMember: state.listMember
    }
}

const mapDispatchToProps = dispatch => {
    return {
      EditDescriptIssues: (id, data) => dispatch(action.EditDescriptIssues(id, data)),
      AssignforUser: (id, iduser) => dispatch(action.AssignforUser(id, iduser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueContainer)