import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/admin";
import * as actionsProject from "../../Store/actions/project";
import _ from "lodash";
import { Redirect } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from "reactstrap";
import { Link } from 'react-router-dom' 
import CreateProject from "../Modal/CreateProject";
class HeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
      nameProject:'',
      status: false
    };
    this.toggle = this.toggle.bind(this);
    this.createProject = this.createProject.bind(this);
    this.showToggle = this.showToggle.bind(this);
    this.handleNameProject = this.handleNameProject.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  showToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  handleNameProject(event){
    event.preventDefault();
    this.setState({
      nameProject : event.target.value
    })
  }
  createProject(event){
    event.preventDefault();
    this.props.createProjectAct(this.state.nameProject)
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    console.log(user[0].email);
    this.props.SearchEmail(user[0].email);
  }
  render() {
    const admin = this.props.admin;
    console.log(admin)
    _.map(admin, item => {
      console.log(item.name);
    });
    return (
      <div className="header-board">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Jirallo</NavbarBrand>
          <NavbarToggler />
          <div>
            <Navbar color="light" light expand="md">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="#">Components</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">DashBoard</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right  >
                      <DropdownItem ><Link to="/viewAll">View All Project</Link></DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <CreateProject/>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          <div className="user-info">
            <div className="name-user">
              <p>
                {_.map(admin, (item, key) => {
                  return <span key={item.id}>{item.name}</span>;
                })}
                <i className="fas fa-user-tie"></i>
              </p>
            </div>
          </div>
        </Navbar>
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
    SearchEmail: email => dispatch(actions.SearchAction(email)),
    createProjectAct : name => dispatch(actionsProject.createProjectAct(name))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBoard);
