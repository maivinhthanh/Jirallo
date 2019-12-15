import React, { Component } from 'react';
import { useDrop } from 'react-dnd'
import * as action from '../../Store/actions/sprint'
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
        debugger
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
        console.log(activeIssue)
    }
    IssueToSprint(itemDrag, itemDrop){
        console.log(itemDrag, itemDrop)
        let listIssueId = []
        // Keo, tha
        const {activeIssue, issues} = this.props
        let vtx, vty;
        _.filter(activeIssue, (data, key) => {
            if(data._id === itemDrag.item._id){
                vtx = key
            }
        })
        for(let i = activeIssue.length; i>= vtx ; i--){
            activeIssue[i] = activeIssue[i-1]
        }
        activeIssue[vtx] = itemDrop.issue;
        // activeIssue.length ++ ;
            
        // FindIssueInSprint 
        console.log(activeIssue)
        // Filter id trong activeIssue push vao mang
        _.map(activeIssue, (issue, key) =>{
            listIssueId.push(issue._id)
        })
        console.log(listIssueId)
        // console.log(itemDrag.filterSprint._id)
        this.props.DragIssueToSprint(listIssueId, itemDrag.filterSprint._id)
    }
    render() {
        const {filterSprint, modal, activeIssue, issues} = this.props
        console.log(activeIssue)
        return (
            <div>
                {/* <WrapperDrop white filterSprint={filterSprint} handleChange={(id, issue) => this.props.addIssueOnSprint(id, issue)} > */}
                    {_.map(activeIssue, (data, index) => {
                        return (
                            <IssueAdd  white filterSprint={filterSprint} handleAddIssueIntoSprint={(id, issue) => this.IssueToSprint(id, issue)} handleAdd={(id, issue) => this.addIssueOnSprint(id, issue)}  modal={modal} filterSprint={filterSprint} item={data} key={index} />
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
        DragIssueToSprint:(listIssueId, idSprint) => dispatch(action.DragIssueToSprint(listIssueId, idSprint))

    }

}
export default connect(null, mapDispatchToProps)(sprint);