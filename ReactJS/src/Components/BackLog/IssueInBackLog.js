import React, { Component } from 'react';
import { useDrag } from 'react-dnd'
import _ from 'lodash'
import IssuesLog from '../BackLog/IssuesLog'
import WrapperDrop from '../BackLog/WrapperDrop'
import Process from '../Board/Process';

class IssueInBackLog extends Component {
    constructor(props){
        super(props)
        this.flag = true
    }
    parentCallBack = (data, active) => {
        this.props.parentCallBack(data, active)
    }
    changeIssue = (id, issue) => {
        this.props.changeIssue(id, issue)
    }
    addIssue = (DragItem, DropItem) => {
        const {issues, params} = this.props
        let vtx = -1, vty = -1, tam;
        let listissues = []
        _.map(issues,(data, index) => {
            if(data._id === DragItem.item._id) {
                vtx = index
            }
            else {
                if(data._id === DropItem.issue._id) {
                    vty = index
                }
            }
        })
        if(vtx !== -1 && vty !== -1) {
            tam = issues[vtx]
            issues[vtx] = _.clone(issues[vty])
            issues[vty] = _.clone(tam)
        }
        _.map(issues, (data) => {
            listissues.push(data._id)
        })
        this.flag = false
       this.props.AddAndSortIssueInBacklog(listissues,params)
       this.props.LoadData(params,this.flag)
        // this.props.addIssueOnSprint(id, issue)
    }
    AddIssueIntoSprint = (idIssue, id) => {
        this.props.AddIssueIntoSprint(idIssue, id)
    }
    render(){

    return (
        <div className="col-md-12" >
            {/* <WrapperDrop white process={'todo'} handleChange={(id, issue) => this.changeIssue(id, issue)}> */}
            {/* {_.map(_.filter(_.compact(this.props.issues), (item, index) => item.hidden == false), (item, index) => { */}
            {_.map(_.filter(_.compact(this.props.issues)), (item, index) => {
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