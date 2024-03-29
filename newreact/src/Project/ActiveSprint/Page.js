import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'

class ActiveSprintPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps){
    return nextProps.authProject.hasAuth !== this.props.authProject.hasAuth
  }
  componentDidMount(){
    document.title = "Active Sprint"
  }
  render() {
      const { match: { params } } = this.props
      const { note, authProject } = this.props
      if(authProject.hasAuth === true){
        return (
          <div className='row'>
            <div className='col-md-1 item-left' style={{ background: '#6A8DCD'}}>
              <MenuProject idproject={params.id}/>
            </div>
            <div className='col-md-11 item-right' style={{ padding: '0 0px'}}>
              <UI idproject={params.id}/>
              <Toast open={note.show} message={note.message} type={note.type} />
            </div>
          </div>
        )
      }
      else{
        return(
          <Grid >
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
      authProject: state.authProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
      HasAuth: (id) =>dispatch(action.HasAuth(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSprintPage)