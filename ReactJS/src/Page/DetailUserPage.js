import {
  Input,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import _ from "lodash";
import * as Config from "../Config";
import { connect } from "react-redux";
import React, { Component } from "react";
import * as actions from "../Store/actions/admin";
import InfoUser from "../Components/Modal/InfoUser";
import UpdateUser from "../Components/User/UpdateUser";
import * as actionsMember from "../Store/actions/member";
import * as actionsProject from "../Store/actions/project";
import CreateProject from "../Components/Modal/CreateProject";
class DetailUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailUser: ""
    };
    this.name = "";
    this.id = "";
    this.position = "";
    this.getInfoUser = this.getInfoUser.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.findUserLikeEmail = this.findUserLikeEmail.bind(this);
  }
  componentDidMount() {
    this.getInfoUser();
    this.props.getAllListProject();
  }
  getInfoUser() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    this.props.SearchEmail(user[0].email);
  }
  handleEmail(e) {
    e.preventDefault();
    this.setState({
      EmailUser: e.target.value
    });
  }
  findUserLikeEmail() {
    this.props.SearchEmail(this.state.EmailUser);
  }
  render() {
    const { admin, project, user, member } = this.props;
    _.map(admin, item => {
      this.name = item.name;
      this.id = item._id;
    });
    _.map(project, item => {
      _.map(item.idmembers, data => {
        this.position = data.position;
      });
    });
    return (
      <div className="detail-user">
        <div className="header-detail"></div>
        <div className="content-user">
          <div className="avatar-image">
            {_.map(admin, (data, index) => {
              return (
                <img
                  key={index}
                  src={Config.API_URL + "/" + data.image}
                  alt="Hipster"
                />
              );
            })}
          </div>
          <div className="wrap-content">
            <div className="blog-title">
              <div className="name-user">
                <h1 style={{textAlign:'left'}}>{this.name} <span style={{fontSize:'15px'}}>({this.position})  <div>
             <div className="setting"> {
                _.map(admin, (item,index) => {
                  return <UpdateUser key={index} data ={item}
                 id={this.id} />
                })
              }</div>
              </div></span></h1> 
              </div>
              {/* <div className="detail">
                <InfoUser admin={admin} />
              </div> */}
            </div>
            <div className="description">
              <p><InfoUser admin={admin} /></p>
              
              {/* <div>
            {
                _.map(admin, (item,index) => {
                  console.log(item)
                  return <UpdateUser key={index} data ={item}
                 id={this.id} />
                })
              }
            </div> */}
              <div style={{ marginTop: "20px" }} className="menu">
                <ul>
                  <li>
                    <i className="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fab fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fab fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fab fa-github"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className="search">
              <Input
                type="text"
                name="text"
                value={this.EmailUser}
                onChange={this.handleEmail}
                id="exampleSelectMulti"
                placeholder="search"
              ></Input>
              <i
                onClick={this.findUserLikeEmail}
                className="icon fas fa-plus"
              ></i>
            </div>
            <div className="about" style={{marginTop:'20px'}}>
            <div className="top-about" style={{marginTop:'10px'}}>
            <h4>About</h4>
            <ul style={{paddingLeft: '30px'}}>
                <li>Your job tittle</li>
                <li>Your department</li>
                <li>Your organization</li>
                <li>Your location</li>
              </ul>
              <h4>Contact</h4>
                <p>tuyetnhiit1008@gmail.com</p>
                <h4>Teams</h4>
            </div>
            </div>
          </div>
        </div>
        <div className="content-task">
          <h4>Work on</h4>
          <table class="table table-hover">
            <tbody>
              {_.map(project, (item, index) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h4>Work with</h4>
          <table class="table table-hover table-work-with">
          <div className="img">
            <p>Nguyen Van A</p>
          </div>
          </table>
          <p>Tell us about your experience with profiles and search within this directory.</p>
          {/* <Card>  
          <div className="title">
        <span>Title: Places work</span>
      </div>
            <div className="detail-task-user">
              <ProjectDetail member={member} project={project} AddMemberAct={this.props.AddMemberAct} findUserEmail={this.props.findUserEmail} />
            </div>
          </Card> */}
        </div>
        {/* <div className="content-task">
          <Card>
          <div className="title">
        <span>Title: Places work</span>
      </div>
            <div className="detail-task-user">
              <ProjectDetail member={member} project={project} AddMemberAct={this.props.AddMemberAct} findUserEmail={this.props.findUserEmail} />
            </div>
          </Card>
        </div> */}
        <div className="project">
          <CreateProject />
        </div>
        <div className="breadcrumb-custom">
          <Breadcrumb>
            {/* <BreadcrumbItem>
              <div>
              {
                _.map(admin, (item,index) => {
                  return <UpdateUser key={index} data ={item}
                 id={this.id} />
                })
              }
              </div>
            </BreadcrumbItem> */}
            <BreadcrumbItem active>
              <a href="#">
                <i className="fas fa-user-friends"></i> People
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <a href="">
                {" "}
                <i className="fas fa-home"></i> Home
              </a>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    admin: state.admin,
    member: state.member,
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SearchEmail: email => dispatch(actions.SearchAction(email)),
    findUserEmail: email => dispatch(actionsMember.SearchAction(email)),
    getAllListProject: () => dispatch(actionsProject.getListProjectAct()),
    AddMemberAct: (idproject, user) =>dispatch(actionsProject.AddMemberAct(idproject, user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailUserPage);
