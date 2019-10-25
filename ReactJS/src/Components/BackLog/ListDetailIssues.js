import React, { Component } from "react";
import * as action from "../../Store/actions/issues";
import { connect } from "react-redux";
import _ from "lodash";
import DescriptTask from "../Task/DescriptTask";
import UpdateIssue from "../Modal/UpdateIssue";
import * as actionIssue from "../../Store/actions/issues";
import * as actionSprint from '../../Store/actions/sprint';
import * as actionAdmin from "../../Store/actions/admin"
// import * as actionUser from '../../Store/actions/user';
class ListDetailIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      status: false,
      highlightItems: [],
    };
    this.idActive = ''
    this.itemACtive = []
    this.itemFlag = ''
    // console.log(this.props.AddFlagIssue)
  }
  showContent(id) {
    this.idActive = id
    this.setState({
      modal: true
    });
  }
  RedirectToUpdate =(item)=> {
    this.setState({
      status: true
    })
    this.itemACtive = item
  }
  AddFlagIssueAct = (item) => {
    // this.setState({
    //   highlightItems: [...this.state.highlightItems, item._id]
    // })
    const {issues} = this.props
   _.map(_.compact(issues), (data,key)=> {
      if(data._id === item){
        this.itemFlag = item
        document.getElementsByClassName('nameIssue')[key].setAttribute('style','color: red')
      }
   })
  }
  RemoveFlag = (item) => {
    const {issues} = this.props
    _.map(_.compact(issues), (data,key)=> {
       if(data._id === item){
         this.itemFlag = item
         document.getElementsByClassName('nameIssue')[key].setAttribute('style','color: black')
       }
    })
  }
  componentWillMount() {
    this.props.showListIssue(this.props.params);
  }
  render() {
    const { issues, sprint, user, admin } = this.props;
    const { modal, status} = this.state;
    console.log(this.itemACtive)
    return (
      <div>
         {/* <div className="list-sprint">
         <ul>
         {
          _.map(sprint,(data, key) => {
           return <li key={key}>{data.name}</li>
          })
         }
          </ul>
         </div> */}
        <div className="item-issue">
          {_.map(_.compact(issues), (item, index) => {
            return (
              <div
                className={`issues ${!modal ? '' : "custom"}`}
                style={{ float: "left", marginLeft: "75px" }}
              >
              <div className="nameIssue">
                <span onClick={() => this.showContent(item._id)}>
                {item.name}
                </span>
                </div>
                <i data-toggle="modal"
            data-target="#myModal" className="fas fa-cog setting-issue" onClick={() => this.RedirectToUpdate(item)}></i>
              </div>
            );
          })}
        </div>
        {status == true && <UpdateIssue EditIssuesAct={this.props.EditIssuesAct} params={this.itemACtive._id} data = {this.itemACtive}/> }
        <div className="content-right">
          <div className={`${modal ? "" : "hidden"}`}>
             {
               _.map(_.compact(issues), (item,key) => {
                 if(item._id === this.idActive){
                   return <DescriptTask key={key} data={item} user ={user} admin={admin} assignTaskIssueAct={this.props.assignTaskIssueAct} findUserLikeEmail={this.props.findUserLikeEmail} AddFlagIssueAct={this.AddFlagIssueAct} RemoveFlag={this.RemoveFlag} />
                 }
               })
             }
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
    user : state.user,
    admin: state.admin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showListIssue: id => dispatch(action.showListIssueAct(id)),
    EditIssuesAct: (id, data) => dispatch(actionIssue.EditIssuesAct(id, data)),
    showListSprint: (id) => dispatch(actionSprint.showListSprintAct(id)),
    findUserLikeEmail:(email) => dispatch(actionAdmin.SearchAction(email)),
    assignTaskIssueAct: (idIssue, idUser) => dispatch(action.assignTaskIssueAct(idIssue, idUser))
    // findUserLikeIDAct: (idUser) => dispatch(actionUser.findUserLikeIDAct(idUser))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailIssues);
