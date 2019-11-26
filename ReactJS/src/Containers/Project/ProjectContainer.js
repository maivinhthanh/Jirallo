import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import "../Project/assets/style.css";

import * as actions from "../../Store/actions/project";
import * as actionsAdmin from "../../Store/actions/admin"

import ProjectDetail from "../../Components/Project/projectDetail";
import ListProject from "../../Components/Project/listProject";
import IteamHeader from "../../Components/IteamHeader";
import HeaderProject from '../../Components/Project/HeaderProject'

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
    const {status} = this.state
     _.map(project, item => {
      _.map(item.idmembers, data => {
        this.position = data.position
      })
    })
    return (
      <div className="row">
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
        <div className="col-1"></div>
        <div className="col-11">
          <HeaderProject />
          <div className="row">
            <div className="col-4" >
              
              <div className="project-task-list" style={{height: '700px',overflow: 'auto'}}>
                <ProjectDetail project={project} AddMember={this.props.AddMember} editEditNameProject={this.props.editEditNameProject} />
              </div>
            </div>
            <div className="col-8">
              <div className="focus-detail">
                
                {status ? <ListProject project={project} admin={admin} SearchUser={this.props.SearchUser}/> :
                <ListProject project={this.cloneProject} admin={admin} SearchUser={this.props.SearchUser}/>
                }
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.admin,
    project: state.project
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllListProject: () => dispatch(actions.getListProjectAct()),
    SearchUser:(id) => dispatch(actionsAdmin.FindUserAction(id)),
    AddMember:(id,user) => dispatch(actions.AddMemberAct(id,user)),
    editEditNameProject:(name, id) => dispatch(actions.editEditNameProject(name, id))
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectContainer);
