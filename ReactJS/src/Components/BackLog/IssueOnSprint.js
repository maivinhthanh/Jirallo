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
  // getIssueOnSprint = (id) => {
  //   this.props.ViewListIssueInSprint(id)
  // }
  componentDidMount(){
    const {filterSprint} = this.props
    console.log(filterSprint)
    // this.props.ViewListIssueInSprint(filterSprint._id)
  }
  // componentDidUpdate(nextProps, preProps){
  //   const {filterSprint} = this.props
  //   _.map(this.props.sprint, (item) => {
  //     if(nextProps.filterSprint._id !== item._id)
  //   {
  //     //this.props.ViewListIssueInSprint(item._id)
  //   }
  //   })
    
  // }
 
  renderSprint = (id) => {
    const { issues, filterSprint, user, admin, issueOnSprint } = this.props;
    // Default de khi khong co issue trong sprint thi load mac dinh issue nay
    console.log(this.props.sprint.length)
    let listIssue = []
   
    console.log("ABC",id,issueOnSprint)
  
    _.map(this.props.sprint, (item, key) => {

      this.props.ViewListIssueInSprint(item._id)
      console.log(issueOnSprint)
    })
    console.log(listIssue)
    _.map(this.props.sprint, (item, key) => {
      this.activeIssue[key] = {
        datecreate: "2019-12-17T03:02:18.805Z",
        name: "default",
        id: '00',
        idsprint: [],
        idproject: "",
        sprintActive : item[key],
        listIssue: listIssue
      };
    })
    console.log(this.activeIssue)
  }

  render() {
    const { issues, filterSprint, user, admin, params, issueOnSprint } = this.props;
    const { modal, status } = this.state;
    console.log(this.props)
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
             filterSprint={filterSprint}/>
          {/* <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%', }} >
            <div style={{
              backgroundColor: fill, width: '100%',
              height: '100%',}} >
              <div className='border' style={{ padding: '10px' }}>
                <span>Sprint default</span>
              </div>
            </div>
          </div> */}
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
