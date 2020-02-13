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
      const { idproject, project, listIssues } = this.props
      return (
          <UI idproject={idproject} project={project} listIssues={listIssues}/>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      project: state.project,
      listIssues : state.listIssues
    }
}

const mapDispatchToProps = dispatch => {
    return {
      GetInfoProject: (id) => dispatch(action.GetInfoProject(id)),
      GetIssuesInSprintActive: (id, user) => dispatch(action.GetIssuesInSprintActive(id, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprintContainer)