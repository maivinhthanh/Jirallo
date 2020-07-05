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

  getSelect = (process, sprint) =>{
    let arrprocess = []
    let arrsprint = []
    _.forEach(process, (value, key)=>{
      if(value === true){
        arrprocess = [...arrprocess, key]
      }
    })
    _.forEach(sprint, (value, key)=>{
      if(value === true){
        arrsprint = [...arrsprint, key]
      }
    })
    this.props.FilterIssues(this.props.idproject, arrprocess, arrsprint)
  }

  selectIssues = async (issue) =>{
    await this.props.GetComment(issue)
    await this.props.SelectIssues(issue)

  }
  
  render() {
      const { idproject, project, listissues, listsprint } = this.props
      return (
        <div >
          <Grid container >
            
            <Grid item xs={5}>
              <Filter idproject={ idproject } project={project} 
              listsprint={listsprint} getSelect={this.getSelect}/>
            </Grid>

            <Grid item xs={7}>
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
      listissues: state.listissues,
      listsprint: state.listsprint
    }
}

const mapDispatchToProps = dispatch => {
    return {
      FilterIssues: (id, process, sprint) => dispatch( action.FilterIssues(id, process, sprint) ),
      SelectIssues:(issue) => dispatch( action.SelectIssues(issue) ),
      GetComment:(idissue) => dispatch( action.GetComment(idissue) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)