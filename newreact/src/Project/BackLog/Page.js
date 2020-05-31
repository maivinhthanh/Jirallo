import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'
import MenuHeader from '../../Core/Home/Menu/MenuHeader'
import Grid from '@material-ui/core/Grid';
import CallAPI from '../../until/apiCaller'

class BackLogPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps){
    return nextProps.authProject.hasAuth != this.props.authProject.hasAuth
  }
  componentDidMount(){
    const { match: { params } } = this.props
    document.title = "Back Log"
    this.props.getInfoProject(params.id)
  }
  render() {
      const { match: { params } } = this.props
      const { note, authProject,project } = this.props
      if(authProject.hasAuth === true){
        return (
          <div className='row'>
            <div className='col-md-1 item-left' style={{ background: 'blue'}}>
            <MenuHeader/>
            </div>
            <div className='col-md-11 item-right'>
            <UI idproject={params.id} project={project} />
                <Toast open={note.show} message={note.message} type={note.type} />
            </div>
           </div>
        )
      }
      else{
        return(
          <Grid  >
                <MenuProject idproject={params.id}/>
                <p>Project không tồn tại</p>
                <Toast open={note.show} message={note.message} type={note.type} />

          </Grid>
        )
      }
      
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      authProject: state.authProject,
      project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
      HasAuth: (id) =>dispatch(action.HasAuth(id)),
      getInfoProject: (id) => dispatch(action.GetInfoProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackLogPage)