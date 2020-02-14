import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import IssuesUI from './IssuesUI'
import * as action from './action'

class BacklogContainer extends Component {
  componentWillMount() {
    this.props.ShowListSprint(this.props.idproject, null)
    this.props.ShowListIssueInBackLog(this.props.idproject, null)
  }
  render() {
      // console.log(this.props.issueinbacklog)
      console.log(this.props.listissues)
      const { listissues } = this.props
      return (
        <div >
          <IssuesUI item={listissues}/>
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      // issueinbacklog: state.issueinbacklog,
      listsprint: state.listsprint,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ShowListIssueInBackLog: (id, iduser) => dispatch(action.ShowListIssueInBackLog(id, iduser)),
      ShowListSprint: (id, iduser) => dispatch(action.ShowListSprint(id, iduser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BacklogContainer)