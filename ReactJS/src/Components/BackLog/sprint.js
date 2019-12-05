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
    addIssueOnSprint(itemDrag, itemDrop){
        const {activeIssue, issues} = this.props
        console.log(itemDrag.item, itemDrop.issue)
        let vtx, vty;
        _.filter(issues, (data, key) => {
            if(data._id === itemDrag.item._id){
                vtx = key
            }
        })
        _.filter(issues, (data, key) => {
            if(data._id === itemDrop.issue._id){
                vty = key
            }
        })
        _.map(issues, (data, index) => {
            if(index === vtx){
                issues[index] = itemDrop.issue
            } else {
                if(index === vty){
                    issues[index] = itemDrag.item
                }
            }
        })
        console.log(issues)
    }
    render() {
        const {filterSprint, modal, activeIssue, issues} = this.props
        return (
            <div>
                {/* <WrapperDrop white filterSprint={filterSprint} handleChange={(id, issue) => this.props.addIssueOnSprint(id, issue)} > */}
                    {_.map(activeIssue, (data, index) => {
                        return (
                            <IssueAdd  white filterSprint={filterSprint} handleAdd={(id, issue) => this.addIssueOnSprint(id, issue)}  modal={modal} filterSprint={filterSprint} item={data} key={index} />
                        );
                    })}
                {/* </WrapperDrop> */}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIssueOnSprint: (id, issue) => dispatch(action.AddIssueIntoSprint(id, issue))
    }

}
export default connect(null, mapDispatchToProps)(sprint);