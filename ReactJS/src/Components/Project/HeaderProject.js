import React, { Component } from "react";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import _ from "lodash";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
}
  from "reactstrap"
import * as actionsAdmin from "../../Store/actions/admin";
import * as actionsProject from "../../Store/actions/project";
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
// import swal from "sweetalert";
import swal from "sweetalert2"

class HeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      keyseach: '',
      showModal: false,
      modal: false,
      nameProject: '',
      show: false
    };
  }
  handleKeySeach = (event) => {
    event.preventDefault();
    this.setState({
      keyseach: event.target.value
    })
  }
  isShowModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
    this.props.isShowModal(this.state.showModal)
  }
  showToggle = () => {
    this.setState(preState => ({
      modal: !preState.modal
    }))
  }
  handleNameProject = (event) => {
    event.preventDefault();
    this.setState({
      nameProject: event.target.value
    })
  }
  createProject = (event) => {
    event.preventDefault();
    this.props.createProjectAct(this.state.nameProject)
    swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'Create project success',
      showConfirmButton: false,
      timer: 1500
    })
    this.showToggle()
  }
  render() {
    const { active, keyseach, show } = this.state
    return (
      <div className="row" style={{ height: '60px', padding: '10px 0px', backgroundColor: '#6A8DCD', marginBottom: '20px' }}>
        <div className='col-1'></div>
        <div className='col-4'>
          <InputGroup >
            <Input value={keyseach} onChange={this.handleKeySeach} />
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fas fa-search"></i></InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className='col-1'></div>
        <div className='col-6 text-center' >
          <Button color="success" onClick={() => this.showToggle()} style={{ border: '1px solid' }}
          ><b>Create Project</b></Button>
          <div className="modal-create">
            <Modal
              isOpen={this.state.modal}
              toggle={this.showToggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.showToggle}>
                Create project
            </ModalHeader>
              <ModalBody>
                <Input type="text" onChange={this.handleNameProject} value={this.state.nameProject} name="project" id="project" placeholder="with name project" />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onClick={this.createProject}>
                  Add
              </Button>{" "}
                <Button color="secondary" onClick={this.showToggle}>
                  Cancel
              </Button>
              </ModalFooter>
            </Modal>
          </div>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
    project: state.project,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SearchEmail: email => dispatch(actionsAdmin.SearchAction(email)),
    createProjectAct: name => dispatch(actionsProject.createProjectAct(name))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBoard);
