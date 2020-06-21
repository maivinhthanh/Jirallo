import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import UI from './MemberUI'
import * as action from './action'
import '../Member/style.css'


class MemberContainer extends Component {

  componentWillMount() {
    this.props.GetListUserInProject(this.props.idproject)
  }
  // shouldComponentUpdate(nextProps, nextState){
  //     return this.props.listMember != nextProps.listMember 
  //   }
  selectUser = (id, index, status) =>{
    if(status === true){
      this.props.selectUser(null)
    }
    else{
      this.props.selectUser(id)
    }
    
    this.props.ChangeActive(index, status)
  }
  render() {
      const { listMember } = this.props

      return (
        <Grid container >
              <UI listMember={listMember} selectUser={(id, index, status)=>this.selectUser(id, index, status)} />
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
      GetListUserInProject: (idproject) => dispatch(action.GetListUserInProject(idproject)),
      ChangeActive: (index, status) => dispatch(action.changeactive(index, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberContainer)