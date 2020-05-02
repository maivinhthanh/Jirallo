import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'
import MenuHeader from '../../Core/Home/Menu/MenuHeader'
import Grid from '@material-ui/core/Grid';

class BackLogPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps){
    return nextProps.authProject.hasAuth != this.props.authProject.hasAuth
  }
  render() {
      const { match: { params } } = this.props
      const { note, authProject } = this.props
      if(authProject.hasAuth === true){
        return (
          <Grid container spacing={0}>
          <div className='row'>
            <div className='col-md-1 item-left' style={{ background: 'blue'}}>
            <MenuHeader/>
            </div>
            <div className='col-md-11 item-right'>
            <UI idproject={params.id}/>
                <Toast open={note.show} message={note.message} type={note.type} />
            </div>
           </div>
           </Grid>
        )
      }
      else{
        return(
          <p>project không tồn tại</p>
        )
      }
      
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      authProject: state.authProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
      HasAuth: (id) =>dispatch(action.HasAuth(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackLogPage)