import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom'

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'
import * as actionFilter from './Filter/action'

class IssuesFilterPage extends Component {
  async componentWillMount(){
    this.props.HasAuth(this.props.match.params.id)
    this.props.ViewInfoProject(this.props.match.params.idproject)
    if(this.props.match.params.idissues === 'null')
    {

    }
    else if(this.props.match.params.idissues){
      await this.props.GetComment(this.props.match.params.idissues)
      await this.props.SelectIssues(this.props.match.params.idissues)
    }
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
            
                <MenuProject idproject={params.idproject}/>
                <UI idproject={params.idproject}/>
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
      authProject: state.authProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
      HasAuth: (id) =>dispatch(action.HasAuth(id)),
      ViewInfoProject: (id) => dispatch( action.ViewInfoProject(id)),
      SelectIssues:(issue) => dispatch( actionFilter.SelectIssues(issue) ),
      GetComment:(idissue) => dispatch( actionFilter.GetComment(idissue) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFilterPage)