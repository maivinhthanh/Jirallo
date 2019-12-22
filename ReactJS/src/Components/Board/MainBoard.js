import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import ActiveSprints from './ActiveSprints'
import IteamHeader from '../IteamHeader'
import ListUser from '../User/ListUser'
import * as action from '../../Store/actions/project'

class MainBoard extends Component {
  componentWillMount() {
    this.props.getIssuesInSprintActiveACT(this.props.params, null)
  }
  ChangeUser = (id, status) =>{
    if(status){
      this.props.getIssuesInSprintActiveACT(this.props.params, null)
    }
    else{
      this.props.getIssuesInSprintActiveACT(this.props.params, id)
    }
    
  }
  render() {
    const { params } = this.props
    return (
      
      <React.Fragment>
        <div className="row">
          <div className="col-1" >
            <IteamHeader params={params}/>
          </div>
          <div className="col-11" >
            <ListUser params={params} ChangeUser={this.ChangeUser}/>
            <ActiveSprints params={params} />
          </div>
          
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
      project: state.project,
      member: state.member
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getIssuesInSprintActiveACT: (id, user) => dispatch(action.getIssuesInSprintActiveACT(id, user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainBoard)
