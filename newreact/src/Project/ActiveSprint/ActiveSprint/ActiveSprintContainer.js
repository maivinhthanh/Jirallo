import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './UI'
import * as action from './action'
import Member from '../../Member/MemberContainer'
import { Grid } from '@material-ui/core'

class ActiveSprintContainer extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectuser: null,
    }
  }
  componentWillMount() {
    this.props.GetInfoProject(this.props.idproject)
    this.props.GetIssuesInSprintActive(this.props.idproject, null)
  }
  selectUser = (id) =>{
    this.setState({
      selectuser : id
    })
  }
  componentWillUpdate(nextProps, nextState, snapshot) {
    if (nextState.selectuser !== this.state.selectuser) {
      this.props.GetIssuesInSprintActive(this.props.idproject, this.state.selectuser)
    }
  }
  render() {
      const { idproject, project, listissues, ChangeProcessIssue } = this.props
      return (
        <div>
          <Grid item xs={12} >
            <Member idproject={idproject} selectUser={this.selectUser}/>
          </Grid>
          <Grid item xs={12} style={{marginTop: '20px'}}>
            <UI idproject={idproject} project={project} listissues={listissues} ChangeProcessIssue={ChangeProcessIssue}/>
          </Grid>
          
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