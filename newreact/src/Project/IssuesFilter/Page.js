import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

import UI from './UI'
import MenuProject from '../../Core/Home/Menu/MenuProject'
import Toast from '../../Components/Toast'
import * as action from './action'
import * as actionFilter from './Filter/action'

class IssuesFilterPage extends Component {
  async componentWillMount(){
    this.props.ViewInfoProject(this.props.match.params.idproject)
    if(this.props.match.params.idissues === 'null')
    {

    }
    else if(this.props.match.params.idissues){
      await this.props.GetComment(this.props.match.params.idissues)
      await this.props.SelectIssues(this.props.match.params.idissues)
    }
  }
  render() {
      const { match: { params } } = this.props
      const { note } = this.props
      return (
        <Grid  >
          
              <MenuProject idproject={params.idproject}/>
              <UI idproject={params.idproject}/>
              <Toast open={note.show} message={note.message} type={note.type} />

        </Grid>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      note: state.note,
      auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewInfoProject: (id) => dispatch( action.ViewInfoProject(id)),
      SelectIssues:(issue) => dispatch( actionFilter.SelectIssues(issue) ),
      GetComment:(idissue) => dispatch( actionFilter.GetComment(idissue) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFilterPage)