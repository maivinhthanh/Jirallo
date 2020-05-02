import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'

class BackLogPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
  }
  shouldComponentUpdate(nextProps){
    return nextProps.authProject.hasAuth != this.props.authProject.hasAuth
  }
  componentDidMount(){
    document.title = "Back Log"
  }
  render() {
      const { match: { params } } = this.props
      const { note, authProject,project } = this.props
      console.log(project)
      if(authProject.hasAuth === true){
        return (
          <div >
            
                <MenuProject idproject={params.id}/>
                <UI idproject={params.id}/>
                <Toast open={note.show} message={note.message} type={note.type} />
          </div>
        )
      }
      else{
        return(
          <Grid  >
            
                <MenuProject idproject={params.idproject}/>
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
      HasAuth: (id) =>dispatch(action.HasAuth(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackLogPage)