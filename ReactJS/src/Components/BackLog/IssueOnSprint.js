import React, { Component } from "react";
import {
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import _ from "lodash";
import swal from "sweetalert";
import DescriptTask from "../Task/DescriptTask";
import UpdateIssue from "../Modal/UpdateIssue";
import ChildSprint from "./ChildSprint";
import Sprint from "./sprint";
export default class IssueOnSprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      status: false
    };
    this.idActive = "";
    this.itemActive = [];
    this.itemFlag = "";
    this.idIssue = "";
    this.arrayList = [];

    this.activeIssue = [];
    this.filterIssue = [];
    this.showContent = this.showContent.bind(this);
  }
  showContent(id) {
    this.idActive = id;
    this.setState({
      modal: true
    });
  }
  getIssueOnSprint = (id) => {
    this.props.ViewListIssueInSprint(id)
  }
  renderSprint = () => {
    const { issues, filterSprint, user, admin } = this.props;
    this.activeIssue = [];
    _.map(issues, (item, key) => {
      _.map(filterSprint.idissues, (data, index) => {
        if (data === item._id) {
          this.activeIssue.push(item);
        }
      });
    });
  };

  render() {
    const { issues, filterSprint, user, admin } = this.props;
    const { modal, status } = this.state;
    return (
      <div>
        <div className="item-issue">
          {this.renderSprint()}
          {/* <ChildSprint showContent={this.showContent()} data={this.activeIssue} modal={modal} /> */}
          <Sprint activeIssue={this.activeIssue} modal={modal} issues={issues} filterSprint={filterSprint}/>
        </div>
        {status == true && (
          <UpdateIssue
            EditIssuesAct={this.props.EditIssuesAct}
            params={this.itemActive._id}
            data={this.itemActive}
          />
        )}
        {/* <div className="content-right">
          <div className={`${modal ? "" : "hidden"}`}>
            {_.map(_.compact(issues), (item, key) => {
              if (item._id === this.idActive) {
                return (
                  <DescriptTask
                    key={key}
                    data={item}
                    user={user}
                    admin={admin}
                    assignTaskIssueAct={this.props.assignTaskIssueAct}
                    findUserLikeEmail={this.props.findUserLikeEmail}
                    AddFlagIssueAct={this.AddFlagIssueAct}
                    RemoveFlag={this.RemoveFlag}
                    // removeIssue={this.props.removeIssue}
                  />
                );
              }
            })}
          </div>
        </div> */}
      </div>
    );
  }
}
