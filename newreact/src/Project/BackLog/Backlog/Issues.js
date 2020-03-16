import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import IssuesUI from './IssuesUI'
import * as action from './action'

class IssuesContainer extends Component {
  constructor(props){
    super(props);
    this.state ={
      selectuser: null,
    }
  }
  componentWillMount() {
    this.props.ViewListIssueInSprint(this.props.idproject, this.props.idsprint, null)
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   return this.props.selectuser != nextProps.selectuser 
  // }
  componentWillUpdate(nextProps, nextState, snapshot) {
    if (nextProps.selectuser != this.props.selectuser) {
      this.props.ViewListIssueInSprint(this.props.idproject, this.props.idsprint, nextProps.selectuser)        
    }
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
      listissues[haveInList] = itemDrag.item
      listissues[vtx] = reserve

    }
    else{
      if(!listissues){

      }
      else if(listissues.length === 0){
        listissues[0] = itemDrop.issue
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
  
        listissues[vtx] = itemDrop.issue
      }

    }

    _.map(listissues, (issue, key) => {
      listIssueId.push(issue._id)
    })
    await this.props.AddAndSortIssuesInSprint( itemDrop.issue.idsprint, itemDrag.item.idsprint, itemDrop.issue._id, listIssueId)
    await this.props.ShowListSprint (this.props.idproject, null)
  }
  
  render() {
      const { listissues, idsprint, idproject } = this.props
      let listissuesEmpty
      if(listissues){
        listissuesEmpty = listissues.length !== 0
      }
      else{
        listissuesEmpty = false
      }
      
      const fakeissue = {
        _id: '',
        name: null,
        type: 'task',
        idsprint: idsprint
      }
      return (
        <div >
          {
            listissuesEmpty
              ? _.map(listissues, (item, index) =>{
                return(
                  <IssuesUI idproject={idproject} item={item} key={index} handleAddIssueIntoSprint={(id, issue) => this.IssueToSprint(id, issue)}/> 
                )
              })
                  
              :  <IssuesUI item={fakeissue} handleAddIssueIntoSprint={(id, issue) => this.IssueToSprint(id, issue)}/> 
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
      AddAndSortIssuesInSprint: (idSprintGive, idSprintTake, idIssues, listIssue) => 
        dispatch(action.AddAndSortIssuesInSprint(idSprintGive, idSprintTake, idIssues, listIssue)),
      ShowListSprint: (idproject, iduser) => dispatch(action.ShowListSprint(idproject, iduser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer)