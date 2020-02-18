import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import IssuesUI from './IssuesUI'
import * as action from './action'

class BacklogContainer extends Component {
  componentWillMount() {
    this.props.ViewListIssueInSprint(this.props.idsprint)
  }
  IssueToSprint  = async (itemDrag, itemDrop) =>{
    console.log(this.props.listissues)
    console.log(itemDrag, itemDrop)
    const { listissues } = this.props
    let vtx, vty;
    let listIssueId = []

    const haveInList = listissues.findIndex(i => i._id === itemDrop.issue._id)

    console.log(haveInList)
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
      console.log(vtx, listissues)

    }

    _.map(listissues, (issue, key) => {
      listIssueId.push(issue._id)
    })

    await this.props.AddAndSortIssuesInSprint(itemDrag.item.idsprint[0], itemDrop.issue._id, listIssueId)
    
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
      ViewListIssueInSprint: (id) => dispatch(action.ViewListIssueInSprint(id)),
      AddAndSortIssuesInSprint: (idsprint, idissues, listissues) => 
        dispatch(action.AddAndSortIssuesInSprint(idsprint, idissues, listissues)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BacklogContainer)