import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import SprintUI from './SprintUI'
import * as action from './action'
import _ from 'lodash'
import { successModal } from '../../../Components/modalStatus';

class Sprint extends Component {
  beginStatusSprint = (idsprint) =>{
    this.props.beginStatusSprint(idsprint, this.props.idproject)
  }
  updateNameSprint = (id, name) =>{
    this.props.updateNameSprint(id, name)
  }
  createIssue = async(issue, isSprint) =>{
    const { sprint } = this.props
    await this.props.createIssue(issue, this.props.idproject, isSprint)
    await this.props.ViewListIssueInSprint(this.props.idproject, _.get(sprint, '_id'), null)
    successModal()
  }
  handleDeleteSprint = (id, idproject) => {
    this.props.handleDeleteSprint(id, idproject)
  }
  render() {
      const { sprint, idproject, selectuser } = this.props
      return (
        <div >
          <Grid container spacing={1} >
              <SprintUI idproject={idproject} sprint={sprint} selectuser={selectuser}
              beginStatusSprint={this.beginStatusSprint}
              updateNameSprint={this.updateNameSprint}
              handleDeleteSprint={this.handleDeleteSprint}
              createIssue={this.createIssue}/>
          </Grid>
        </div>
      )
    
  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    beginStatusSprint: (idsprint, idproject) => dispatch(action.beginStatusSprint(idsprint, idproject)),
    updateNameSprint: (id, name) => dispatch(action.updateNameSprint(id, name)),
    createIssue : (issue, idproject, isSprint) => dispatch(action.createIssue(issue, idproject, isSprint)),
    handleDeleteSprint: (id, idproject) => dispatch(action.deleteSprint(id, idproject)),
    ViewListIssueInSprint: (idproject, idsprint, user) => dispatch(action.ViewListIssueInSprint(idproject, idsprint, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sprint)