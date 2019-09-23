import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/admin";
import * as actionsGroup from "../../Store/actions/group";
import _ from "lodash";
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
class HeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
      nameGroup:''
    };
    this.toggle = this.toggle.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.showToggle = this.showToggle.bind(this);
    this.handleNameGroup = this.handleNameGroup.bind(this);
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
  handleNameGroup(event){
    event.preventDefault();
    this.setState({
      nameGroup : event.target.value
    })
    console.log(this.state.nameGroup)
  }
  createGroup(event){
    event.preventDefault();
    this.props.createGroupAct(this.state.nameGroup)
    console.log(this.props.group)
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    console.log(user[0].email);
    this.props.SearchEmail(user[0].email);
  }
  render() {
    const admin = this.props.admin;
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
                    <DropdownMenu right>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div>
                    <div>
                      <Button color="success" onClick={this.showToggle}>
                        createGroup
                      </Button>
                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.showToggle}
                        className={this.props.className}
                      >
                        <ModalHeader toggle={this.showToggle}>
                          Create group
                        </ModalHeader>
                        <ModalBody>
                        <Input type="text" onChange={this.handleNameGroup} value={this.state.nameGroup} name="group" id="group" placeholder="with name group" />
                        </ModalBody>
                        <ModalFooter>
                          <Button type="submit" color="primary" onClick={this.createGroup}>
                            Add
                          </Button>{" "}
                          <Button color="secondary" onClick={this.showToggle}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          <div className="user-info">
            <div className="name-user">
              <p>
                {_.map(admin, item => {
                  return <span>{item.name}</span>;
                })}
                <i class="fas fa-user-tie"></i>
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
    group: state.group
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SearchEmail: email => dispatch(actions.SearchAction(email)),
    createGroupAct: name => dispatch(actionsGroup.createGroupAct(name))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBoard);
