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
  // componentWillReceiveProps(nextProps){
  //   this.getIssueOnSprint(nextProps.filterSprint._id)
  // }
  renderSprint = () => {
    const { issues, filterSprint, user, admin } = this.props;
    let arrayList = [];
    _.map(issues, (item, key) => {
      _.map(filterSprint.idissues, (data, index) => {
        if (data === item._id) {
          arrayList.push(item);
        }
      });
    });
    _.map(arrayList, (list, index1) => {
      this.activeIssue.push(list);
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
          <React.Fragment>
            {_.map(this.activeIssue, (item, key) => {
              return (
                <div
                  className={`issues ${!modal ? "" : "custom"}`}
                  style={{ float: "left", marginLeft: "75px", marginBottom:'15px' }}
                >
                  <div className="nameIssue">
                    <span>
                      {item.name}
                    </span>
                  </div>
                  <i
                    data-toggle="modal"
                    data-target="#myModal"
                    className="fas fa-cog setting-issue"
                    // onClick={() => this.RedirectToUpdate(item)}
                  ></i>
                  <div className="option-add">
                    <UncontrolledDropdown>
                      <DropdownToggle caret>
                        <i
                          class="fas fa-ellipsis-h setting-addsprint"
                          // onClick={() => this.getIdIssue(item._id)}
                          style={{ color: "black", marginTop: "-7px" }}
                        ></i>
                      </DropdownToggle>
                      <DropdownMenu>
                      {_.map(filterSprint, (data, index) => {
                        return (
                          <DropdownItem
                            // onClick={() => this.addIssueToSprint(data._id)}
                            key={index}
                          >
                            {data.name}
                          </DropdownItem>
                        );
                      })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        </div>
        {status == true && (
          <UpdateIssue
            EditIssuesAct={this.props.EditIssuesAct}
            params={this.itemActive._id}
            data={this.itemActive}
          />
        )}
        <div className="content-right">
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
        </div>
      </div>
    );
  }
}
