import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'

class ConfigPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
    this.props.ViewInfoProject(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps){
    return nextProps.authProject.hasAuth != this.props.authProject.hasAuth
  }
  render() {
      const { match: { params } } = this.props
      const { note, authProject } = this.props
      if(authProject.hasAuth === true){
        return (
          <Grid  >
            
                <MenuProject idproject={params.id}/>
                <UI idproject={params.id}/>
                <Toast open={note.show} message={note.message} type={note.type} />

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
      auth: state.auth,
      authProject: state.authProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewInfoProject: (id) => dispatch(action.ViewInfoProject(id)),
      HasAuth: (id) =>dispatch(action.HasAuth(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage)