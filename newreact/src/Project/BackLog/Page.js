import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'

class BackLogPage extends Component {
  componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
  }
  
  render() {
      const { match: { params } } = this.props
      const { note, authProject } = this.props
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
          <Redirect
            to={{
              pathname: "/viewAll"
            }}
          />
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