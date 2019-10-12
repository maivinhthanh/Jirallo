import React, { Component } from "react";
import "../Project/assets/style.css";
import { Link } from "react-router-dom";
import {
  Table,
  Input,
  Breadcrumb,
  BreadcrumbItem
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
class project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameProject: ""
    };
    this.position = ''
    // this.findUserLikeEmail = this.findUserLikeEmail.bind(this)
  }
  componentDidMount() {
    this.props.getAllListProject();
  }
  // componentWillMount(){
  //   const user = JSON.parse(localStorage.getItem("userLogin"));
  //   console.log(user[0].email);
  //   this.props.SearchEmail(user[0].email);
  // }
  render() {
    const { project } = this.props;
    const { admin } = this.props;
     _.map(project, item => {
      _.map(item.idmembers, data => {
        this.position = data.position
      })
    })
    return (

      <div className="listProject container row">
        <div className="col-md-3 user-tag">
          <div className="content-user">
            <div className="avatar-image">
              <img
                src="https://66.media.tumblr.com/avatar_76339a619be6_128.pnj"
                alt="Hipster"
              />
            </div>
            <div className="blog-title">
              <span>
              {
                _.map(admin, (item,key) => {
                  return <h1 key ={item._id}>{item.name}</h1>
                })
              }
              </span>
            </div>
            <div className="description">
              <p>{this.position}</p>
              <p></p>
              <div style={{marginLeft:'-17px'}} className="menu">
                <ul>
                  <li>
                    <i class="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i class="fab fa-facebook"></i>
                  </li>
                  <li>
                    <i class="fab fa-instagram"></i>
                  </li>
                  <li>
                    <i class="fab fa-github"></i>
                  </li>
                </ul>
              </div>
            
            </div>
          </div>
          <ToggleHome/>
        </div>
        <div className="col-md-3 task-list">
        <div className="project-task-list">
        <h1>Project</h1>
        <ProjectDetail project={project} AddMember={this.props.AddMember} />
        </div>
        </div>
        <div className="col-md-6 project-list">
        <div className="focus-detail">
        <div className="search-project">
        <Input style={{width:'25%', marginBottom:'20px'}} type="text" name="text" id="search" placeholder="search" />
        </div>
        <ListProject project={project} admin={admin} SearchEmail={this.props.SearchEmail}/>
        </div>
       <div className="modal-create">
       <CreateProject/>
       </div>
        </div>
        <div style={{marginBottom:'0rem'}} className="breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem active>
            <Link to ="/user">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
            <Link to ="/Board">
                <i class="fas fa-user-friends"> Board</i>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <Link to ="/backlog">
                <i class="fas fa-home"></i> Backlog
                </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.project, state.admin)
  return {
    admin: state.admin,
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllListProject: () => dispatch(actions.getListProjectAct()),
    SearchEmail:(email) => dispatch(actionsAdmin.SearchAction(email)),
    AddMember:(id,user) => dispatch(actions.AddMemberAct(id,user))
    };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(project);
