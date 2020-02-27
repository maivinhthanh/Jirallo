import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import UI from './MemberUI'
import * as action from './action'

class MemberContainer extends Component {
  componentWillMount() {
    this.props.GetListUserInProject(this.props.idproject)
  }
  selectUser = (id) =>{
    this.props.selectUser(id)
  }
  render() {
      const { listMember } = this.props
      console.log(this.props.listMember)
      return (
        <Grid container >
          
              <UI listMember={listMember} selectUser={(id)=>this.selectUser(id)} />
            
        </Grid>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      listMember: state.listMember
    }
}

const mapDispatchToProps = dispatch => {
    return {
      GetListUserInProject: (idproject) => dispatch(action.GetListUserInProject(idproject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberContainer)