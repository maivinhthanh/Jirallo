import React, { Component } from "react";
import * as action from "../../Store/actions/issues";
import { connect } from "react-redux";
import _ from "lodash";
import DescriptTask from "../Task/DescriptTask";
import UpdateIssue from "../Modal/UpdateIssue";
import * as actionIssue from "../../Store/actions/issues";
import * as actionSprint from "../../Store/actions/sprint";
import * as actionAdmin from "../../Store/actions/admin";
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
// import * as actionUser from '../../Store/actions/user';
// import swal from "sweetalert";
import IssueOnSprint from "./IssueOnSprint";
import ListSprintDetail from "./ListSprintDetail";
class ListDetailIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      status: false,
      loadData: false,
      highlightItems: []
    };
    this.idActive = "";
    this.itemACtive = [];
    this.itemFlag = "";
    this.idIssue = "";
    // this.arrayList = [];
    this.dataTranfer = false;
  }
  showContent(id) {
    this.idActive = id;
    this.setState({
      modal: !this.state.modal
      // modal: true
    });
    // console.log(id)
    // console.log(this.props.issues)
    // const issueFilter = _.filter(this.props.issues,item => item._id === id)
    // console.log(issueFilter)
    // _.map(issueFilter, (item, key) => {
    //   console.log(item)
    //   this.props.findUserLikeId(item.assignee)
    // })
  }
  RedirectToUpdate = item => {
    this.setState({
      status: true
    });
    this.itemACtive = item;
  };
  AddFlagIssueAct = item => {
    // this.setState({
    //   highlightItems: [...this.state.highlightItems, item._id]
    // })
    const { issues } = this.props;
    _.map(_.compact(issues), (data, key) => {
      if (data._id === item) {
        this.itemFlag = item;
        document
          .getElementsByClassName("nameIssue")
          [key].setAttribute("style", "color: red");
      }
    });
  };
  RemoveFlag = item => {
    const { issues } = this.props;
    _.map(_.compact(issues), (data, key) => {
      if (data._id === item) {
        this.itemFlag = item;
        document
          .getElementsByClassName("nameIssue")
          [key].setAttribute("style", "color: black");
      }
    });
  };
  getIdIssue = idIssue => {
    this.idIssue = idIssue;
  };
  addIssueToSprint = id => {
    console.log(id)
    // this.arrayList.push(id);
    this.props.AddIssueIntoSprint(this.idIssue, id);
    // swal({
    //   title: "Insert success!",
    //   text: "Complete!",
    //   type: "success",
    //   confirmButtonText: "Cool"
    // });
  };
  componentWillMount() {
    this.props.showListIssue(this.props.params);
    this.props.showListSprint(this.props.params);
  }
  // componentDidUpdate(preState) {
  //   // !_.isEqual(preState.sprint, this.props.sprint) && this.setState({loadData: true})
  //   if (preState.sprint !== this.props.sprint) {
  //     this.renderListSprint(this.props.sprint)
  //   }
  // }
  // renderListSprint = (sprintCustom) => {
  //   const { issues, sprint, user, admin } = this.props;
  //   const { modal, status, loadData } = this.state;
  //     return (
  //       <ListSprintDetail
  //         sprint={sprintCustom}
  //         user={user}
  //         admin={admin}
  //         modal={modal}
  //         issues={issues}
  //         handleDeleteSprint={this.props.handleDeleteSprint}
  //         updateNameAct={this.props.updateNameAct}
  //       />
  //     );
  // };
  dataAssignee=(data)=>{
    this.props.findUserLikeId(data.assignee)
  }
  render() {
    const { issues, sprint, user, admin, params } = this.props;
    const { modal, status, loadData } = this.state;
    console.log(this.props.issues)
    return (
      <div>
        <div
          className={`list-sprint item-issue ${!modal ? "" : "customSprint"}`}
        >
          <ul>
          <ListSprintDetail
          params={params}
          sprint={sprint}
          user={user}
          admin={admin}
          modal={modal}
          issues={issues}
          handleDeleteSprint={this.props.handleDeleteSprint}
          completeSprintAct={this.props.completeSprintAct}
          updateNameAct={this.props.updateNameAct}
          beginSprint={this.props.beginSprint}
        />
            {/* {this.renderListSprint(sprint)} */}
          </ul>
        </div>
        <div className="item-issue">
          <p style={{ textAlign: "left", marginLeft: "72px" }}>BackLog</p>
          {_.map( _.filter(_.compact(issues),(item, key) => item.hidden == false), (item, index) => {
            
            return (
              <div
                className={`issues ${!modal ? "" : "custom"}`}
                key={index}
                style={{
                  float: "left",
                  marginLeft: "75px",
                  marginBottom: "15px"
                }}
              >
                <div className="nameIssue">
                  <span onClick={() => this.showContent(item._id)}>
                    {item.name}
                  </span>
                </div>
                <i
                  data-toggle="modal"
                  data-target="#myModal"
                  className="fas fa-cog setting-issue"
                  onClick={() => this.RedirectToUpdate(item)}
                ></i>
                <div className="option-add">
                  <UncontrolledDropdown>
                    <DropdownToggle caret>
                      <i
                        className="fas fa-ellipsis-h setting-addsprint"
                        onClick={() => this.getIdIssue(item._id)}
                        style={{ color: "black", marginTop: "-7px" }}
                      ></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      {_.map(sprint, (data, index) => {
                        return (
                          <DropdownItem
                            onClick={() => this.addIssueToSprint(data._id)}
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
        </div>
        {status == true && (
          <UpdateIssue
            EditIssuesAct={this.props.EditIssuesAct}
            params={this.itemACtive._id}
            data={this.itemACtive}
          />
        )}
        <div className="content-right">
          <div className={`${modal ? "" : "hidden"}`}>
            {_.map(_.compact(issues), (item, key) => {
              if (item._id === this.idActive) {
                return (
                  <DescriptTask
                    issues ={issues}
                    key={key}
                    data={item}
                    user={user}
                    admin={admin}
                    assignTaskIssueAct={this.props.assignTaskIssueAct}
                    findUserLikeEmail={this.props.findUserLikeEmail}
                    AddFlagIssueAct={this.AddFlagIssueAct}
                    RemoveFlag={this.RemoveFlag}
                    removeIssue={this.props.removeIssue}
                    changeProcessIssue={this.props.changeProcessIssue}
                    findUserLikeId={this.props.findUserLikeId}
                    dataAssignee={this.dataAssignee}
                    updateNameIssue={this.props.updateNameIssue}
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
const mapStateToProps = state => {
  return {
    issues: state.issue,
    sprint: state.sprint,
    user: state.user,
    admin: state.admin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showListIssue: id => dispatch(action.showListIssueAct(id)),
    EditIssuesAct: (id, data) => dispatch(actionIssue.EditIssuesAct(id, data)),
    showListSprint: id => dispatch(actionSprint.showListSprintAct(id)),
    findUserLikeEmail: email => dispatch(actionAdmin.SearchAction(email)),
    assignTaskIssueAct: (idIssue, idUser) =>
      dispatch(action.assignTaskIssueAct(idIssue, idUser)),
    AddIssueIntoSprint: (idIssue, idSprint) =>
      dispatch(actionIssue.AddIssueIntoSprint(idIssue, idSprint)),
    ViewListIssueInSprint: id =>
      dispatch(actionSprint.ViewListIssueInSprint(id)),
    removeIssue: id => dispatch(actionIssue.removeIssue(id)),
    changeProcessIssue:(idIssue, process) => dispatch(actionIssue.changeProcessIssue(idIssue,process)),
    handleDeleteSprint: (id) => dispatch(actionSprint.deleteSprint(id)),
    completeSprintAct: (id) => dispatch(actionSprint.completeSprintAct(id)),
    findUserLikeId: (id) => dispatch(actionAdmin.FindUserAction(id)),
    updateNameAct:(name,id) => dispatch(actionSprint.updateNameAct(name, id)),
    updateNameIssue:(name, id) => dispatch(actionIssue.updateNameIssue(name, id)),
    beginSprint:(idSprint, idProject) => dispatch(actionSprint.beginSprint(idSprint, idProject))
    // findUserLikeIDAct: (idUser) => dispatch(actionUser.findUserLikeIDAct(idUser))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailIssues);
