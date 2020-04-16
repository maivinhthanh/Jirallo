import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './UI'
import * as action from './action'

class ActiveSprintContainer extends Component {
  componentWillMount() {
    this.props.GetInfoProject(this.props.idproject)
    this.props.GetIssuesInSprintActive(this.props.idproject, null)
  }
  render() {
      const { idproject, project, listissues, ChangeProcessIssue } = this.props
      return (
        <div>
          <UI idproject={idproject} project={project} listissues={listissues} ChangeProcessIssue={ChangeProcessIssue}/>
          </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      project: state.project,
      listissues : state.listissues
    }
}

const mapDispatchToProps = dispatch => {
    return {
      GetInfoProject: (id) => dispatch(action.GetInfoProject(id)),
      GetIssuesInSprintActive: (id, user) => dispatch(action.GetIssuesInSprintActive(id, user)),
      ChangeProcessIssue: (id, process) => dispatch(action.ChangeProcessIssue(id, process)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprintContainer)