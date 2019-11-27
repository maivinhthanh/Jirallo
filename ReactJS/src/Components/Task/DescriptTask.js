import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import FormDescript from "./FormDescript";
import ModalLog from "../Modal/ModalLog";
import "../Task/assets/style.css";
import _ from "lodash";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import InputField from '../InputEdit/inputField'
export default class DescriptTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      changeData: false,
      email: "",
      process: this.props.data.process,
      newData: this.props.data
    };
    this.showInputAssign = this.showInputAssign.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.assignTask = this.assignTask.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChangeProcess = this.handleChangeProcess.bind(this);
  }
  componentDidMount(){
    const {data} = this.props
    this.props.dataAssignee(data)
  }
  AddFlag(idActive) {
    this.props.AddFlagIssueAct(idActive);
  }
  RemoveFlag(idActive) {
    this.props.RemoveFlag(idActive);
  }
  showInputAssign() {
    this.setState(preState => ({
      status: !preState.status
    }));
  }
  onChangeEmail(event) {
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  }
  componentDidUpdate(preState) {
    if (this.state.changeData === true) {
     !_.isEqual(preState.admin, this.props.admin) &&
        this.tranferDataToAssign();
    }
  }
  tranferDataToAssign() {
    const { data } = this.props;
    _.map(this.props.admin, item => {
      this.props.assignTaskIssueAct(data._id, item._id);
    });
  }
  assignTask(e) {
    e.preventDefault();
    this.props.findUserLikeEmail(this.state.email);
    this.setState(preState => ({
      changeData: !preState.changeData,
      status: !preState.status

    }));
  }
  remove(id) {
    this.props.removeIssue(id);
  }
  handleChangeProcess(e) {
    e.preventDefault();
    const { data, issues } = this.props
    this.setState({
      process: e.target.value
    });
    _.map(issues, (item, key) => {
      if (data._id === item._id) {
        item.process = e.target.value
      }
    })
    this.props.changeProcessIssue(data._id, e.target.value)
  }
  updateNameIssue =(data, name) => {
    this.props.updateNameIssue(data, name)
  }
  render() {
    const { data } = this.props;
    const { user, admin } = this.props;
    const { status } = this.state;
    return (
      <div className="descriptWork">
        <div className="list-item-right dropdown">
          <div>
            <h4 style={{ textAlign: "initial" }}>
              WORKJIRA /
              <span>
              <InputField nameInput={'issue'} isssue={data} changeName={(item,name) => this.updateNameIssue(item, data._id)}>{data.name}</InputField>
                {/* {data.name} */}
                <div className="chooseOptionEdit">
                  <UncontrolledDropdown>
                    <DropdownToggle className="custom-issue" caret>
                      <i className="icon fas fa-ellipsis-h"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.AddFlag(data._id)}>
                        Add Flag
                      </DropdownItem>
                      <DropdownItem onClick={() => this.RemoveFlag(data._id)}>
                        Move Flag
                      </DropdownItem>
                      <DropdownItem onClick={() => this.remove(data._id)}>
                        Remove
                      </DropdownItem>
                      <DropdownItem>Clone</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </span>
            </h4>
            {/* <FormDescript description={data.descript} /> */}
            <FormGroup>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                value={data.descript}
              />
            </FormGroup>
            <div className="container modal-log-work">
              <a href="#" data-toggle="modal" data-target="#myModal1">
                Log Work
              </a>
              <ModalLog />
            </div>
            <div className="processIssue">
              <div className="form-group">
                <label for="sel1" style={{ marginLeft: '-85px' }}>STATUS:</label>
                <select className="form-control" id="sel1" name="sellist1" onChange={this.handleChangeProcess} value={this.state.process}>
                  <option value="todo">Todo</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                  <option value="inProgress">InProgress</option>
                </select>
              </div>
            </div>
            <div className="detail-work-task">
              <h4>Details</h4>
              <div className="row">
                <div className="text-detail col-md-2">
                  <ul className="item-detail-left">
                    <li>Status:</li>
                    <li>Prioriry:</li>
                    <li>Label:</li>
                    <li>Epic:</li>
                    <li>Type:</li>
                  </ul>
                </div>
                <div className="text-detail col-md-10">
                  <ul className="item-detail-right">
                    <li>Open</li>
                    <li>{data.priority}</li>
                    <li>None</li>
                    <li>Form Search</li>
                    <li>{data.type}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="detail-work-task">
              <h4>People</h4>
              <div className="row">
                <div className="text-detail col-md-2">
                  <ul className="item-detail-left">
                    <li>Reporter:</li>
                    <li>Assignee:</li>
                  </ul>
                </div>
                <div className="text-detail col-md-10">
                  <ul className="item-detail-right">
                    {/* {this.findUserLikeID(data.repoter)} */}
                    <li>
                      {_.map(user, (item, key) => {
                        if (item._id === data.repoter) {
                          return item.name;
                        }
                      })}
                    </li>
                    <li>
                      <span>
                        {
                          _.map(admin, (item, key) => {
                          return <span>{item.name}</span>
                          })
                        }
                      {/* <span>{data.assignee}</span> */}
                        <i
                          onClick={this.showInputAssign}
                          className="fas fa-pen"
                        ></i>
                      </span>
                    </li>
                    {status && (
                      <div className="input-assign">
                        <InputGroup>
                          <Input
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                          />
                          <InputGroupAddon addonType="append">
                            <Button onClick={this.assignTask} color="secondary">
                              Assign
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="detail-work-task">
              <h4>Description</h4>
              <FormGroup>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  value={data.descript}
                />
              </FormGroup>
            </div>
            <div className="detail-work-task">
              <h4>Comment</h4>
              There are no comments yet on this issue
              <p></p>
              <FormGroup>
                <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
            </div>
            <div className="detail-work-task">
              <h4>Attachments</h4>
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
