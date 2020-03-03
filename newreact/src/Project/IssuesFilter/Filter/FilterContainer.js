import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid } from '@material-ui/core'

import ListIssues from './ListIssues'
import Filter from './Filter'
import * as action from './action'

class FilterContainer extends Component {
  componentWillMount(){
    this.props.FilterIssues(this.props.idproject, null)
  }

  getSelect = (data) =>{
    let arr = []
    _.forEach(data, (value, key)=>{
      if(value === true){
        arr = [...arr, key]
      }
    })
    this.props.FilterIssues(this.props.idproject, arr)
  }

   selectIssues = async (issue) =>{
    await this.props.GetComment(issue)
    await this.props.SelectIssues(issue)
    

  }
  
  render() {
      const { idproject, project, listissues } = this.props
      return (
        <div >
          <Grid container >
            
            <Grid item xs={6}>
              <Filter idproject={ idproject } project={project} getSelect={this.getSelect}/>
            </Grid>

            <Grid item xs={6}>
              <ListIssues idproject={ idproject } listissues={listissues} selectIssues={this.selectIssues}/>
            </Grid>

          </Grid>
          
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
      project: state.project,
      listissues: state.listissues
    }
}

const mapDispatchToProps = dispatch => {
    return {
      FilterIssues: (id, process) => dispatch( action.FilterIssues(id, process) ),
      SelectIssues:(issue) => dispatch( action.SelectIssues(issue) ),
      GetComment:(idissue) => dispatch( action.GetComment(idissue) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)