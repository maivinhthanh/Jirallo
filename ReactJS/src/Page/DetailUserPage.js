import React, { Component } from "react";
import {
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";
import UpdateUser from "../Components/User/UpdateUser";
import * as actions from "../Store/actions/admin";
import * as actionsProject from "../Store/actions/project";
import { connect } from "react-redux";
import _ from "lodash";
import ProjectDetail from "../Components/Project/projectDetail";
import CreateProject from "../Components/Modal/CreateProject";
class DetailUserPage extends Component {
  constructor(props) {
    super(props);
    this.name = "";
    this.id = "";
    this.getInfoUser = this.getInfoUser.bind(this);
  }
  componentDidMount() {
    this.getInfoUser();
    this.props.getAllListProject();
  }
  getInfoUser() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    this.props.SearchEmail(user[0].email);
    console.log(this.props.user);
  }
  render() {
    const admin = this.props.admin;
    const project = this.props.project;
    _.map(admin, item => {
      this.name = item.name;
      this.id = item._id;
    });
    console.log(this.id)
    console.log(admin)
    return (
      <div className="detail-user">
        <div className="header-detail"></div>
        <div className="content-user">
          <div className="avatar-image">
            <img
              src="https://66.media.tumblr.com/avatar_76339a619be6_128.pnj"
              alt="Hipster"
            />
          </div>
          <div className="blog-title">
            <span>
              <h1>{this.name}</h1>
            </span>
          </div>
          <div className="description">
            <p>FrontEnd Developer</p>
            <div>
              <UpdateUser/>
            </div>
            <div className="menu">
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
        <div className="content-task">
          <Card>
          <div className="title">
        <span>Title: Places work</span>
      </div>
            <div className="detail-task-user">
              <ProjectDetail project={project} />
              {/* <CardBody>
          <CardTitle>Name task</CardTitle>
          <CardSubtitle>Detail subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button><Link to ="/viewAll">
                <span>View</span>
              </Link></Button>
        </CardBody> */}
            </div>
          </Card>
        </div>
        <div className="project">
        <CreateProject/>
          {/* <div>
            <Button color="success" onClick={this.showToggle}>
              <i class="fas fa-plus"></i> Create Project
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.showToggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.showToggle}>Create project</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  onChange={this.handleNameProject}
                  value={this.state.nameProject}
                  name="project"
                  id="project"
                  placeholder="with name project"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  onClick={this.createProject}
                >
                  Add
                </Button>{" "}
                <Button color="secondary" onClick={this.showToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div> */}
        </div>
        <div className="breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem active>
              <div>
                <UpdateUser 
                // email={this.props.email}
                // password={this.props.password}
                // name={this.props.name}
                // female={this.props.female}
                 id={this.id} />
              </div>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <a href="#">
                <i class="fas fa-user-friends"></i> People
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <a href="">
                {" "}
                <i class="fas fa-home"></i> Home
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
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SearchEmail: email => dispatch(actions.SearchAction(email)),
    getAllListProject: () => dispatch(actionsProject.getListProjectAct())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailUserPage);
