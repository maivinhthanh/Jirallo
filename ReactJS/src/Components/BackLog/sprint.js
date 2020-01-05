import React, { Component } from 'react';
import { useDrop } from 'react-dnd'
import * as action from '../../Store/actions/sprint'
import * as actionIssue from '../../Store/actions/issues'
import { connect } from 'react-redux'
import _ from 'lodash'
import WrapperDrop from './WrapperDrop';
import IssueAdd from './issueAdd';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
    Label
  } from "reactstrap";

class sprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            name: '',
            process: '',
            priority: '',
            type: '',
            tag: '',
            descript: ''
        }
        // this.addIssueOnSprint = this.props.addIssueOnSprint
    }
    addIssueOnSprint(itemDrop, itemDrag) {
        const { activeIssue, issues } = this.props
        let vtx, vty;
        _.filter(activeIssue, (data, key) => {
            if (data._id === itemDrag.issue._id) {
                vtx = key
            }
        })
        _.filter(activeIssue, (data, key) => {
            if (data._id === itemDrop.item._id) {
                vty = key
            }
        })
        _.map(activeIssue, (data, index) => {
            if (index === vtx) {
                activeIssue[index] = itemDrop.item
            } else {
                if (index === vty) {
                    activeIssue[index] = itemDrag.issue
                }
            }
        })
    }
    async IssueToSprint(itemDrag, itemDrop) {
        let listIssueId = []
        // Keo, tha
        const { activeIssue, issues, params } = this.props
        let vtx, vty;
        _.filter(activeIssue.listissues, (data, key) => {
            if (data._id === itemDrag.item._id) {
                vtx = key
            }
        })
        for (let i = activeIssue.listissues.length; i >= vtx; i--) {
            activeIssue.listissues[i] = activeIssue.listissues[i - 1]
        }
        activeIssue.listissues[vtx] = itemDrop.issue;

        // Filter id trong activeIssue push vao mang
        _.map(activeIssue.listissues, (issue, key) => {
            listIssueId.push(issue._id)
        })

        await this.props.DragIssueToSprint(listIssueId, itemDrag.filterSprint._id, itemDrop.issue._id)
        await this.props.ViewListIssueInSprint(itemDrag.filterSprint._id)
        this.props.loadDataIssue(params)
    }
    showInfomationIssue = (id, modal) => {
        const {activeIssue } = this.props
        let cloneIssue = ''
        _.map(activeIssue.listissues, (item, index) => {
            if(item._id === id) {
                cloneIssue = item
            }
        })
        this.setState({
            status: modal,
            name: cloneIssue.name,
            priority: cloneIssue.priority,
            process: cloneIssue.process,
            descript: cloneIssue.descript,
            type: cloneIssue.type,
            tag: cloneIssue.tag

        })
    }
    render() {
        const { filterSprint, modal, activeIssue, issues } = this.props
        return (
            <div className='sprint-detail-drag'>
                {_.map(activeIssue.listissues, (data, index) => {
                    return (
                        <IssueAdd showInfomationIssue={this.showInfomationIssue} white filterSprint={filterSprint} handleAddIssueIntoSprint={(id, issue) => this.IssueToSprint(id, issue)} handleAdd={(id, issue) => this.addIssueOnSprint(id, issue)} modal={modal} item={data} key={index} />
                    );
                })}
                <div id="demo3" className="collapse">
          <div>
            <Modal
              isOpen={this.state.status}
              className={this.props.className}
            >
              <ModalHeader>
                Infomation Issues
              </ModalHeader>
              <ModalBody>
                <Form >
                <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                          type="text"
                          name="text"
                          value={this.state.name}
                          id="name"
                          required
                          placeholder="with a placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="priority">Priority</Label>
                        <Input
                          type="text"
                          name="priority"
                          value={this.state.priority}
                          id="priority"
                          // required
                          placeholder="priority placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="gender">Process</Label>
                        <Input
                          type="text"
                          name="text"
                          id="process"
                          value={this.state.process}
                          required
                          placeholder="process placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="text">Type</Label>
                        <Input
                          type="text"
                          name="text"
                          id="text"
                          value={this.state.type}
                          required
                          placeholder="type placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="text">Tag</Label>
                        <Input
                          type="text"
                          name="text"
                          id="text"
                          value={this.state.tag}
                          required
                          placeholder="type placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="text">Description</Label>
                        <Input
                          type="text"
                          name="text"
                          id="description"
                          value={this.state.descript}
                          required
                          placeholder="descript placeholder"
                        />
                      </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.showInfomationIssue}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIssueOnSprint: (id, issue) => dispatch(action.AddIssueIntoSprint(id, issue)),
        DragIssueToSprint: (listIssueId, idSprint, newIssue) => dispatch(action.DragIssueToSprint(listIssueId, idSprint, newIssue)),
        showListIssueInBackLog: id => dispatch(actionIssue.showListIssueInBackLog(id)),

    }

}
export default connect(null, mapDispatchToProps)(sprint);