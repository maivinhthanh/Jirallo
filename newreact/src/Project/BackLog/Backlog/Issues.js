import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import IssuesUI from './IssuesUI'
import * as action from './action'

class IssuesContainer extends Component {
  componentWillMount() {
    this.props.ViewListIssueInSprint(this.props.idproject, this.props.idsprint, null)
  }
  IssueToSprint  = async (itemDrag, itemDrop) =>{
    const { idproject, listissues } = this.props
    let vtx, vty;
    let listIssueId = []

    const haveInList = listissues.findIndex(i => i._id === itemDrop.issue._id)

    if(haveInList !== -1)
    {

      _.filter(listissues, (data, index) => {
        if (data._id === itemDrag.item._id) {
            vtx = index
        }
      })
      let reserve = listissues[haveInList]
      listissues[haveInList] = itemDrop.issue
      listissues[vtx] = reserve

    }
    else{
      _.filter(listissues, (data, index) => {
        if (data._id === itemDrag.item._id) {
            vtx = index
        }
      })

      for (let i = listissues.length; i >= vtx; i--) {
        listissues[i] = listissues[i - 1]
      }

      listissues[vtx] = itemDrop.issue;

    }

    _.map(listissues, (issue, key) => {
      listIssueId.push(issue._id)
    })

    await this.props.AddAndSortIssuesInSprint(idproject, itemDrag.item.idsprint, itemDrop.issue._id, listIssueId)
    
  }
  render() {
      const { listissues } = this.props
      return (
        <div >
          {
            listissues
              ? _.map(listissues, (item, index) =>{
                return(
                  <IssuesUI item={item} key={index} handleAddIssueIntoSprint={(id, issue) => this.IssueToSprint(id, issue)}/> 
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
      ViewListIssueInSprint: (idproject, idsprint, iduser) => 
        dispatch(action.ViewListIssueInSprint(idproject, idsprint, iduser)),
      AddAndSortIssuesInSprint: (idsprint, idissues, listissues) => 
        dispatch(action.AddAndSortIssuesInSprint(idsprint, idissues, listissues)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer)