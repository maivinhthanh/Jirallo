import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../Store/actions/admin"
import * as actionSprint from "../../Store/actions/sprint";

import _ from "lodash";
import { InputGroup, InputGroupAddon, InputGroupText, Input,
        Modal,ModalBody,ModalHeader,ModalFooter, Button
}
from "reactstrap"

class HeaderBackLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      keyseach: '',
      showModal: false,
      modal: false,
      nameSprint: ''
    };
  }
  onFocus =(data)=>{
    this.setState({
      active:data
    })
  }
  handleKeySeach =(event) =>{
    event.preventDefault();
    this.setState({
      keyseach: event.target.value 
    })
  }
  isShowModal = () =>{
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
  handleNameSprint = (event) => {
    event.preventDefault();
    this.setState({
      nameSprint : event.target.value
    })
  }
  createSprint = (event)=>{
    event.preventDefault();
    this.props.createSprintAct(this.state.nameSprint)
  }
  render() {
    const {active, keyseach} = this.state
    return (
      <div className="row" style={{height: '60px',padding: '10px 0px',backgroundColor: '#6A8DCD',marginBottom: '20px'}}>
        <div className='col-1'></div>
        <div className='col-4'>
          <InputGroup onMouseOver={() =>this.onFocus(true)} onMouseLeave={() =>this.onFocus(false)} >
            <Input value={keyseach} onChange={this.handleKeySeach}/>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fas fa-search"></i></InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className='col-7'>
        <Button color="success" onClick={()=>this.showToggle()} style={{border: '1px solid'}}
          ><b>Create sprint</b></Button>
          <div className="modal-create">
          <Modal
          isOpen={this.state.modal}
          toggle={this.showToggle}
          className={this.props.className}
        >
            <ModalHeader toggle={this.showToggle}>
              Create sprint
            </ModalHeader>
            <ModalBody>
            <label>Name Sprint</label>
            <Input type="text" onChange={this.handleNameSprint} value={this.state.nameSprint} name="sprint" id="sprint" placeholder="with name sprint" />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.createSprint}>
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
    SearchEmail: email => dispatch(actions.SearchAction(email)),
    createSprintAct : (name, id) => dispatch(actionSprint.createSprintAct(name, id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBackLog);
