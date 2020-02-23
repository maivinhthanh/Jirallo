import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './BacklogUI'
import * as action from './action'
import { Grid } from '@material-ui/core'
import AddSprint from './addSprint'
import Member from '../../Member/MemberContainer'

class BacklogContainer extends Component {
  componentWillMount() {
    this.props.ShowListSprint(this.props.idproject, null)
  }
  render() {
      const { idproject, listsprint } = this.props
      return (
        <div >
          <Grid container >
            <Grid item xs={12} >
              <AddSprint idproject={idproject}/>
            </Grid>
            <Grid item xs={12} >
              <Member idproject={idproject}/>
            </Grid>
            <Grid item xs={12}>
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
      ShowListSprint: (id, iduser) => dispatch(action.ShowListSprint(id, iduser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BacklogContainer)