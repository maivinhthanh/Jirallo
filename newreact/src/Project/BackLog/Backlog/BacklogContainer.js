import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './BacklogUI'
import * as action from './action'
import { Grid } from '@material-ui/core'
import AddSprint from './addSprint'

class BacklogContainer extends Component {
  componentWillMount() {
    this.props.ShowListSprint(this.props.idproject, null)
    this.props.ShowListIssueInBackLog(this.props.idproject, null)
  }
  render() {
      const { idproject, listsprint } = this.props
      return (
        <div >
        <Grid item xs={12} >
        <Grid item xs={1} style={{marginTop:'15px', marginLeft:'75px', marginBottom:'50px'}}>
            <AddSprint idproject={idproject}/>
          </Grid>
          <Grid item xs={11}>
          <UI idproject={idproject} listsprint={listsprint}/>
          </Grid>
        </Grid>
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