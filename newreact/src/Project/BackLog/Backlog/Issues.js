import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import IssuesUI from './IssuesUI'
import * as action from './action'

class BacklogContainer extends Component {
  componentWillMount() {
    this.props.ViewListIssueInSprint(this.props.idsprint)
    // this.props.ShowListIssueInBackLog(this.props.idproject, null)
  }
  render() {
      console.log(this.props.listissues)
      const { listissues } = this.props
      return (
        <div >
          {
            listissues
              ? _.map(listissues, (item, index) =>{
                return(
                  <IssuesUI item={item} key={index}/> 
                )
              })
                  
                
              : <div></div>
          }
        </div>
      )
    
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
      ViewListIssueInSprint: (id) => dispatch(action.ViewListIssueInSprint(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BacklogContainer)