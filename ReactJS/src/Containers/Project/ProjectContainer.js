import React, { Component } from "react";
import "../Project/assets/style.css";
import { Link } from "react-router-dom";
import {
  Input,
} from "reactstrap";
import * as actions from "../../Store/actions/project";
import * as actionsAdmin from "../../Store/actions/admin"
import { connect } from "react-redux";
import _ from "lodash";
import { Redirect } from 'react-router-dom';
import ProjectDetail from "../../Components/Project/projectDetail";
import ListProject from "../../Components/Project/listProject";
import ToggleHome from "../../Components/Modal/ToggleHome";
import CreateProject from '../../Components/Modal/CreateProject';
import HeaderCustom from "../../Components/HeaderCustom";
import IteamHeader from "../../Components/IteamHeader";

import * as Config from '../../../src/Config';
class projectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameProject: "",
      valueSearch: "",
      status: true
    };
    this.position = ''
    this.cloneProject = []
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.searchAct = this.searchAct.bind(this)
    this.clearData = this.clearData.bind(this)
  }
  componentDidMount() {
    this.props.getAllListProject();
  }
  clearData(e){
   e.target.value = ''
   this.setState({
     status: true
   })
  }
  searchAct(){
    this.cloneProject = []
    const {project} = this.props;
    _.map(project, (item, key) => {
      if(item.name === this.state.valueSearch){
        this.cloneProject.push(item)
        this.setState({
          status: false
        })
      }
    })
  }
  handleChangeInput(e){
    e.preventDefault();
    this.setState({
      valueSearch: e.target.value
    })
  }
  render() {
    const { project, admin } = this.props;
    console.log("ccc",admin)
    const {status} = this.state
     _.map(project, item => {
      _.map(item.idmembers, data => {
        this.position = data.position
      })
    })
    return (
      <div className="listProject container row">
        <nav className="nav-top">
          <div className="logo">
            <h1>
              <a href="/">
                <img className="logo-menu" src="/logo-menu.jpg" />
              </a>
            </h1>
          </div>
          <IteamHeader/>
        </nav>
        <div className="col-4 task-list">
          <div className="project-task-list" style={{height: '890px',overflow: 'auto'}}>
            <h1>Project</h1>
            <ProjectDetail project={project} AddMember={this.props.AddMember} />
          </div>
        </div>
        <div className="col-6 project-list">
          <div className="focus-detail">
            <div className="search-project">
              <Input style={{width:'25%', marginBottom:'20px'}} onFocus={this.clearData} onChange={this.handleChangeInput} value={this.valueSearch} type="text" name="text" id="search" placeholder="search" />
              <i onClick={this.searchAct} className="icon-search fas fa-search"></i>
            </div>
          {status ? <ListProject project={project} admin={admin} SearchUser={this.props.SearchUser}/> :
          <ListProject project={this.cloneProject} admin={admin} SearchUser={this.props.SearchUser}/>
          }
          </div>
        <div className="modal-create">
       <CreateProject/>
       </div>
        </div>
        {/* <HeaderCustom/> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllListProject: () => dispatch(actions.getListProjectAct()),
    SearchUser:(id) => dispatch(actionsAdmin.FindUserAction(id)),
    AddMember:(id,user) => dispatch(actions.AddMemberAct(id,user))
    };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectContainer);
