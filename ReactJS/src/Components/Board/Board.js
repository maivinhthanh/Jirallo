import React, { Component } from 'react'
import DetailBoard from './DetailBoard'
import * as action from '../../Store/actions/project'
import * as actionAuth from '../../Store/actions/member'
import { connect } from 'react-redux'

class Board extends Component {
  componentWillMount() {
    this.props.viewListIssuesInProject(this.props.params)
  }

  render() {
    return (
      <div>
      <DetailBoard />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
      project: state.project,
      member: state.member
  }
}
const mapDispatchToProps = dispatch => {
  return {
      viewListIssuesInProject: (id) => dispatch(action.viewListIssuesInProject(id)),
      searchEmail: (email) => dispatch(actionAuth.SearchAction(email)),
      AddMemberIntoProject : (idproject, user) => dispatch(action.AddMemberAct(idproject,user)),
      EditProject : (project) => dispatch(action.EditProject(project))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board)
