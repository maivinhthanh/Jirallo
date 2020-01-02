import React, { Component } from "react";
import IssueOnSprint from "./IssueOnSprint";
import _ from "lodash";
import InputField from './../InputEdit/inputField'
import WrapperDrop from "./WrapperDrop";
import Process from "../Board/Process";
import swal from 'sweetalert2';
import { Input, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import { connect } from "react-redux";
import * as action from "../../Store/actions/sprint";
import Calendar from "../BackLog/Calendar";


// import Select from 'react-select';
// export const colourOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
//   { value: 'purple', label: 'Purple', color: '#5243AA' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

class ListSprintDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      flag: true,
      nameSprint: '',
      timeBegin: '',
      deadline: ''

    }
    this.idActive = ''
  }
  deleteSprint(id) {
    const { sprint } = this.props
    _.map(sprint, (item, index) => {
      if (item._id == id) {
        sprint.splice(index, 1)
      }
    })
    this.props.handleDeleteSprint(id)
    swal.fire({
      position: 'center-top',
      icon: 'success',
      title: 'Delete sprint success',
      showConfirmButton: false,
      timer: 1500
    })
  }
  completeSprint(id) {
    this.props.completeSprintAct(id)
  }
  beginSprint(idSprint, idProject) {
    this.props.beginSprint(idSprint, idProject)
  }
  updateName = (data, id) => {
    this.props.updateNameAct(data, id)
  }
  showToggle = (id) => {
    this.setState(preState => ({
      modal: !preState.modal
    }))
    this.idActive = id
  }
  handleNameSprint = (e) => {
    e.preventDefault()
    this.setState({
      nameSprint: e.target.value
    })
  }
  settimebegin = (data) => {
    this.setState({
      timeBegin : data
    })
  }
  setdealine = (data) => {
    this.setState({
      deadline : data
    })
  }
  editSprint = (id) => {
    const { sprint } = this.props
    let data = new FormData()
    data.append('name', this.state.nameSprint)
    data.append('timebegin', this.state.timeBegin)
    data.append('deadline', this.state.deadline)
    this.props.EditSprint(data, this.idActive)
    this.props.showListSprint(this.props.params)
    this.showToggle()
  }

  render() {
    const { sprint, user, admin, issues, modal, params, issueOnSprint } = this.props;
    // const x = _.filter(sprint, (item) => item.hidden == false)
    return (
      <div>
        {!_.isEqual(sprint._id, '') && _.map(sprint, (data, key) => {
          return (
            <div
              className='sprint'
              // className={`container sprint ${!modal ? "" : "layoutSprint"}`}
              key={key}
            >
              <li style={{ marginLeft: "-27px" }}>
                <i className="fas fa-ellipsis-h setting-addsprint" style={{ color: 'black', marginRight: '10px' }}></i>
                <InputField nameInput={'sprint'} sprint={sprint} newdata={(item, name) => this.updateName(item, data._id)}>{data.name}</InputField>
                {/* <span style={{ marginLeft: '10px', color: '#7A869A' }}>{data.idissues.length} issues</span> */}
                <span style={{ position: 'absolute', top: '27px', left: '103px', color: '#7A869A' }}>{data.datecreate}</span>
                {/* <InputField sprint={(data,name) => this.updateName(data, this.props.sprint.name)}>{data.name}</InputField> */}
                <div className="dropdown" style={{ top: '-26px', left: '161px' }}>
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    style={{ height: '30px', border: 'transparent' }}
                    data-toggle="dropdown"
                  >
                  </button>
                  <div className="dropdown-menu">
                    <span className="dropdown-item" onClick={() => this.showToggle(data._id)}>
                      Edit
                    </span>
                    <span className="dropdown-item" onClick={() => this.deleteSprint(data._id, this.props.params)}>
                      Delete
                    </span>
                    <span className="dropdown-item" onClick={() => this.beginSprint(data._id, this.props.params)}>
                      Begin
                    </span>
                    <span className="dropdown-item" onClick={() => this.completeSprint(data._id,  this.props.params)}>
                      Complete
                    </span>
                  </div>
                </div>
              </li>
              <div className="modal-create">
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.showToggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.showToggle}>
                    Edit sprint
                  </ModalHeader>
                  <ModalBody>
                    <label>Name Sprint</label>
                    <Input type="text" onChange={this.handleNameSprint} value={this.state.nameSprint} name="sprint" id="sprint" placeholder="with name sprint" />
                    <label>Time begin </label>
                    <Calendar flag='time' settimebegin={this.settimebegin}/>
                    <label>Dealine</label>
                    <Calendar flag = 'dealine' setdealine = {this.setdealine}/>
                    {/* <Input type="text" onChange={this.handleDealine} value={this.state.deadline} name="deadline" id="deadline" placeholder="with deadline sprint" /> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" color="primary" onClick={() => this.editSprint(data._id)}>
                      Edit
                  </Button>{" "}
                    <Button color="secondary" onClick={this.showToggle}>
                      Cancel
                  </Button>
                  </ModalFooter>
                </Modal>
              </div>
              <div className='optionbtn'>
                {/* <div className={`optionbtn ${!modal ? "" : "custom"}`}> */}
                <IssueOnSprint
                  issueOnSprint={issueOnSprint}
                  sprint={sprint}
                  params={params}
                  user={user}
                  admin={admin}
                  filterSprint={data}
                  issues={issues}
                  ViewListIssueInSprint={this.props.ViewListIssueInSprint}
                  loadDataIssue={this.props.loadDataIssue}
                />
              </div>
              {/* <div className="create">
              <createSprint params={params}/>
              </div> */}
            </div>
          );
        })
        }
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    EditSprint: (data, id) => dispatch(action.EditSprint(data, id)),
    showListSprint:(id) => dispatch(action.showListSprintAct(id))
  }
}
const mapStateToProps = state => {
  return {
    sprint: state.sprint
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListSprintDetail)

