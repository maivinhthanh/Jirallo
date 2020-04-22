import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import SprintUI from './SprintUI'
import * as action from './action'

class Sprint extends Component {
  beginStatusSprint = (idsprint) =>{
    this.props.beginStatusSprint(idsprint, this.props.idproject)
  }
  updateNameSprint = (id, name) =>{
    this.props.updateNameSprint(id, name)
  }
  createIssue = (issue) =>{
    this.props.createIssue(issue, this.props.idproject)
  }
  render() {
      const { sprint, idproject, selectuser } = this.props
      return (
        <div >
          <Grid container spacing={1} >
              <SprintUI idproject={idproject} sprint={sprint} selectuser={selectuser}
              beginStatusSprint={this.beginStatusSprint}
              updateNameSprint={this.updateNameSprint}
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
    createIssue : (issue, idproject) => dispatch(action.createIssue(issue, idproject))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sprint)