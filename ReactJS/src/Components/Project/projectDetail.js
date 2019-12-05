import _ from "lodash";
import React, { Component } from "react";
import * as Config from '../../Config';
import { Link } from "react-router-dom";
import InputField from "../InputEdit/inputField";
import {
  Card, CardBody, CardTitle, CardSubtitle, Button,Modal, ModalBody, ModalHeader, ModalFooter, Input, PopoverHeader, PopoverBody, UncontrolledPopover
} from "reactstrap";
export default class projectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      emailUser: '',
      positionUser: '',
    }
    this.showToggle = this.showToggle.bind(this)
    this.handleEmailUser = this.handleEmailUser.bind(this)
    this.handlePostionUser = this.handlePostionUser.bind(this)
    this.handleIdProject = ''
    this.hanleUserActive = ''
  }
  fomatDateTime(date) {
    return _.slice(_.replace(date, /-/g, "/"), 0, 10);
  }
  addUser = (idproject) => {
    this.props.findUserEmail(this.state.emailUser)
    this.handleIdProject = idproject
  }
  componentDidUpdate(preState) {
    !_.isEqual(preState.member, this.props.member) && this.handleAdd(this.props.member)
  }
  handleAdd(member) {
    const userAdd = { _id: member[0]._id, position: this.state.positionUser }
    this.props.AddMemberAct(this.handleIdProject, userAdd)
  }
  showToggle(id) {
    this.handleIdProject = id
    this.setState(preState => ({
      modal: !preState.modal
    }))
  }
  handleEmailUser(e) {
    e.preventDefault()
    this.setState({
      emailUser: e.target.value
    })
  }
  handlePostionUser(e) {
    e.preventDefault()
    this.setState({
      positionUser: e.target.value
    })
  }
  updateNameProject(item, id) {
    this.props.editEditNameProject(item, id)
  }
  activeProject = (id) => {
    localStorage.setItem('idproject', id)
  }
  render() {
    const { project } = this.props;
    _.map(this.props.member, (item) => {
      this.hanleUserActive = item._id
    })
    return (
      <div>
        {_.map(project, (item, index) => {
          return (
            <Card key={index}>
              <CardBody style={{ background: "#B3C6E6" }}>
                <div className="row">
                  <div className="col-5" >
                    <div id={'Popover-' + index}>
                      {
                        !_.isEmpty(item.image) ?
                          <img className="avatar-image avatar-project" src={Config.API_URL + "/" + item.image}
                            height={96} width={96} />
                          : <img className="avatar-image avatar-project" src={'images/12.jpeg'}
                            height={96} width={96} />
                      }
                    </div>
                  </div>
                  <UncontrolledPopover placement="right" trigger="legacy"
                    target={'Popover-' + index}
                  >
                    <PopoverHeader>Setting</PopoverHeader>
                    <PopoverBody>
                      <div
                        onClick={this.showToggle.bind(this, item._id)}
                        className="row"
                      >
                        <div className="col-3"><i className="fas fa-user-plus"></i></div>
                        <div className="col-9">
                          <b style={{ color: 'black' }}>Add member</b>
                        </div>

                      </div>
                      <br />
                      <div className="row">
                        <div className="col-3"><i className="fas fa-eye"></i></div>
                        <div className="col-9">
                          <Link to={{ pathname: `/backlog/${item._id}` }} onClick={() => this.activeProject(item._id)}>
                            <b style={{ color: 'black' }}>View</b>
                          </Link>
                        </div>

                      </div>
                      <br />
                      <div className="row">
                        <div className="col-3"><i className="fas fa-info-circle"></i></div>
                        <div className="col-9">
                          <Link to={{ pathname: `/Profile/${item._id}` }}>
                            <b style={{ color: 'black' }}>Info </b>
                          </Link>
                        </div>

                      </div>
                    </PopoverBody>
                  </UncontrolledPopover >
                  <div className="col-7">
                    <CardTitle>
                      <h4>
                        <InputField nameInput={'project'}
                          project={project} editData={(data, name) => this.updateNameProject(data, item._id)}
                        >
                          {item.name}
                        </InputField>
                      </h4>
                    </CardTitle>
                    <CardSubtitle>
                      Create day: {this.fomatDateTime(item.datecreate)}
                    </CardSubtitle>
                  </div>
                </div>

              </CardBody>
              <div>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.showToggle.bind(this, item._id)}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.showToggle}>
                    Insert user
                    </ModalHeader>
                  <ModalBody>
                    <label>Email: </label>
                    <Input
                      type="text"
                      onChange={this.handleEmailUser}
                      value={this.state.emailUser}
                      name="email"
                      id="email"
                      placeholder="with email user"
                    />
                    <label>Position: </label>
                    <Input
                      type="text"
                      onChange={this.handlePostionUser}
                      value={this.state.positionUser}
                      name="position"
                      id="position"
                      placeholder="with position user"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={this.addUser.bind(this, item._id)}
                    >
                      Add
                      </Button>{" "}
                    <Button color="secondary" onClick={this.showToggle.bind(this, item._id)}>
                      Cancel
                      </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
