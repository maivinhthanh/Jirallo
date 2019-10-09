import React, { Component } from "react";
import "../Project/assets/style.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import * as actions from "../../Store/actions/project";
import { connect } from "react-redux";
import _ from "lodash";
import { Redirect } from 'react-router-dom';
import ProjectDetail from "../../Components/Project/projectDetail";
class project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameProject: ""
    };
    // this.handleView = this.handleView.bind(this)
  }
  handleView(info){
    console.log(info)
  }

  // useEffect() {
  //   this.props.getAllListProject();
  // }

  componentDidMount() {
    this.props.getAllListProject();
  }

  // fomatDateTime(date){
  //   return _.slice(_.replace(date,/-/g,'/'),0,10)
  // }
  render() {
    const { project } = this.props;
    console.log(project)
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
                <h1>Ran</h1>
              </span>
            </div>
            <div className="description">
              <p>FrontEnd Developer</p>
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
        </div>
        <div className="col-md-9 task-list">
        <ProjectDetail project={project} />
          {/* {_.map(project, item => {
            return (
              <Card>
                <div className="detail-task-user">
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>Create day: {this.fomatDateTime(item.datecreate)}</CardSubtitle>
                    <Button onClick={ this.handleView.bind(this, item) } style={{background:'#d4edda', marginTop:'20px'}}>
                      {" "}
                      <Link to ={{ pathname: `/backlog/${item._id}`}}>
                        <a href="index.html">
                          <span>View</span>
                        </a>
                      </Link>
                    </Button>
                  </CardBody>
                </div>
              </Card>
            );
          })} */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // admin: state.admin,
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllListProject: () => dispatch(actions.getListProjectAct())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(project);
