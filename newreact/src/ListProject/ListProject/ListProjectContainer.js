import React, { Component } from 'react'
import { connect } from 'react-redux'

import ListProjectUI from './ListProjectUI'
import * as action from './action'
import * as actions from '../../Project/ConfigProject/AddMember/action'

class ListProjectContainer extends Component {
  componentDidMount() {
    this.props.ViewListProject()
  }

  render() {

      return (
        <div >
          <ListProjectUI 
          ViewListProject={this.props.ViewListProject}
          findProjectLikeName={this.props.findProjectLikeName}
          auth={this.props.auth}
          AddMemberToProject={this.props.AddMemberToProject}
          findUserLikeEmail={this.props.findUserLikeEmail} note={this.props.note} listproject={this.props.listproject} />
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth,
      listproject: state.listproject,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewListProject: () => dispatch( action.ViewListProject() ),
      findUserLikeEmail: (email) => dispatch(actions.findUserLikeEmailAct(email)),
      AddMemberToProject: (idProject, user) => dispatch(actions.AddMemberAct(idProject, user)),
      findProjectLikeName: (name) => dispatch(actions.findProjectLikeName(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProjectContainer)