import React, { Component } from 'react';
import { useDrop } from 'react-dnd'
import * as action from '../../Store/actions/sprint'
import * as actionIssue from '../../Store/actions/issues'
import { connect } from 'react-redux'
import _ from 'lodash'
import WrapperDrop from './WrapperDrop';
import IssueAdd from './issueAdd';
class sprint extends Component {
    constructor(props) {
        super(props);
        // this.addIssueOnSprint = this.props.addIssueOnSprint
    }
    addIssueOnSprint(itemDrop, itemDrag){
        const {activeIssue, issues} = this.props
        let vtx, vty;
        _.filter(activeIssue, (data, key) => {
            if(data._id === itemDrag.issue._id){
                vtx = key
            }
        })
        _.filter(activeIssue, (data, key) => {
            if(data._id === itemDrop.item._id){
                vty = key
            }
        })
        _.map(activeIssue, (data, index) => {
            if(index === vtx){
                activeIssue[index] = itemDrop.item
            } else {    
                if(index === vty){
                    activeIssue[index] = itemDrag.issue
                }
            }
        })
    }
    async IssueToSprint(itemDrag, itemDrop){
        let listIssueId = []
        // Keo, tha
        const {activeIssue, issues, params} = this.props
        let vtx, vty;
        _.filter(activeIssue.listissues, (data, key) => {
            if(data._id === itemDrag.item._id){
                vtx = key
            }
        })
        for(let i = activeIssue.listissues.length; i>= vtx ; i--){
            activeIssue.listissues[i] = activeIssue.listissues[i-1]
        }
        activeIssue.listissues[vtx] = itemDrop.issue;
        
        // Filter id trong activeIssue push vao mang
        _.map(activeIssue.listissues, (issue, key) =>{
            listIssueId.push(issue._id)
        })
        
        await this.props.DragIssueToSprint(listIssueId, itemDrag.filterSprint._id, itemDrop.issue._id)
        await this.props.ViewListIssueInSprint(itemDrag.filterSprint._id)
        this.props.loadDataIssue(params)
    }
    render() {
        const {filterSprint, modal, activeIssue, issues} = this.props
        return (
            <div className='sprint-detail-drag'>
                {/* <WrapperDrop white filterSprint={filterSprint} handleChange={(id, issue) => this.props.addIssueOnSprint(id, issue)} > */}
                    {_.map(activeIssue.listissues, (data, index) => {
                        return (
                            <IssueAdd  white filterSprint={filterSprint} handleAddIssueIntoSprint={(id, issue) => this.IssueToSprint(id, issue)} handleAdd={(id, issue) => this.addIssueOnSprint(id, issue)}  modal={modal} item={data} key={index} />
                        );
                    })}
        
                {/* </WrapperDrop> */}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIssueOnSprint: (id, issue) => dispatch(action.AddIssueIntoSprint(id, issue)),
        DragIssueToSprint:(listIssueId, idSprint, newIssue) => dispatch(action.DragIssueToSprint(listIssueId, idSprint, newIssue)),
        showListIssueInBackLog: id => dispatch(actionIssue.showListIssueInBackLog(id)),
       
    }

}
export default connect(null, mapDispatchToProps)(sprint);