import React, { Component } from 'react';
import { useDrag } from 'react-dnd'
import _ from 'lodash'
import IssuesLog from '../BackLog/IssuesLog'
import WrapperDrop from '../BackLog/WrapperDrop'
import Process from '../Board/Process';

class IssueInBackLog extends Component {
    // const [{ isDragging }, drag] = useDrag({
    //     item: { type: 'issue', id: props.name },
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // })
    parentCallBack = (data, active) => {
        this.props.parentCallBack(data, active)
    }
    changeIssue = (id, issue) => {
        this.props.changeIssue(id, issue)
    }
    addIssue = (DragItem, DropItem) => {
        const {issues, params} = this.props
        let vtx, vty;
        let listissues = []
        _.filter(issues, (data, key) => {
            if(data._id === DragItem.item._id){
                vtx = key
            }
        })
        for(let i = issues.length; i>= vtx ; i--){
            issues[i] = issues[i-1]
        }
        issues[vtx] = DropItem.issue;

        console.log(issues)
        _.map(issues, (data) => {
            listissues.push(data._id)
        })
        console.log(listissues, params)
        this.props.AddAndSortIssueInBacklog(listissues,params)
        // this.props.addIssueOnSprint(id, issue)
    }
    AddIssueIntoSprint = (idIssue, id) => {
        this.props.AddIssueIntoSprint(idIssue, id)
    }
    render(){
    console.log(this.props.issues)
    console.log(this.props)
    return (
        <div className="col-md-12" >
            {/* <WrapperDrop white process={'todo'} handleChange={(id, issue) => this.changeIssue(id, issue)}> */}
            {_.map(_.filter(_.compact(this.props.issues), (item, index) => item.hidden == false), (item, index) => {
                return (
                    <IssuesLog
                    handleAddIssue={(id, issue) => this.addIssue(id, issue)}
                    white
                    item={item}
                    modal={this.props.modal}
                    sprint={this.props.sprint}
                    parentCallBack={this.parentCallBack}
                    AddIssueIntoSprint={this.AddIssueIntoSprint}
                    />
                )
            })}
            {/* </WrapperDrop> */}
        </div>

    );
}
}
export default IssueInBackLog