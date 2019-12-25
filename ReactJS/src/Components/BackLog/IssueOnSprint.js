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
import { DataBeforeDrag } from "../../until/context";
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
    this.context = [];
    this.showContent = this.showContent.bind(this);
  }
  showContent(id) {
    this.idActive = id;
    this.setState({
      modal: true
    });
  }
  componentDidMount() {
    const { filterSprint } = this.props
    !_.isEmpty(filterSprint)&&
      this.props.ViewListIssueInSprint(filterSprint._id)
  }

  renderSprint = (id) => {
    const { issues, filterSprint, user, admin, issueOnSprint } = this.props;
    let listIssue = []
    _.map(issueOnSprint,(data, key) => {
      if(data.id === filterSprint._id){
          this.activeIssue = _.clone(data)
      }
    })
  }

  render() {
    const { issues, filterSprint, user, admin, params, issueOnSprint } = this.props;
    const { modal, status } = this.state;
    return (
      <div>
        <div className="item-issue">
          {this.renderSprint(filterSprint._id)}
          <Sprint activeIssue={this.activeIssue}
            params={params}
            modal={modal}
            issues={issues}
            ViewListIssueInSprint={this.props.ViewListIssueInSprint}
            loadDataIssue={this.props.loadDataIssue}
            filterSprint={filterSprint} />
          <span>

          </span>
        </div>
        {status == true && (
          <UpdateIssue
            EditIssuesAct={this.props.EditIssuesAct}
            params={this.itemActive._id}
            data={this.itemActive}
          />
        )}
      </div>
    );
  }
}
