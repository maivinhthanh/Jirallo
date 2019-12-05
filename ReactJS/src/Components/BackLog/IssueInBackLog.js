import React, { Component } from 'react';
import { useDrag } from 'react-dnd'
import _ from 'lodash'
import IssuesLog from '../BackLog/IssuesLog'
import WrapperDrop from '../BackLog/WrapperDrop'
import Process from '../Board/Process';

class IssueInBackLog extends Component {
    // console.log(props.name)
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
        console.log(DragItem, DropItem)
        // this.props.addIssueOnSprint(id, issue)
    }
    AddIssueIntoSprint = (idIssue, id) => {
        console.log(idIssue, id)
        this.props.AddIssueIntoSprint(idIssue, id)
    }
    render(){
    return (
        <div >
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