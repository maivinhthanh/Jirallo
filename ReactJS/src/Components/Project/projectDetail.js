import _ from "lodash";
import React, { Component } from "react";
import * as Config from '../../Config';
import InputField from "../InputEdit/inputField";
import {
  Card, CardBody, CardTitle, CardSubtitle, Button,Modal, ModalBody, ModalHeader, ModalFooter, Input
} from "reactstrap";
import { Link } from 'react-router-dom'
import Tilt from 'react-tilt'

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
  showCard = () =>{
    const { project } = this.props
    return(
      _.map(project, (item, index) => {
        return(
        <Tilt className="Tilt" options={{ max : 40 }} style={{ height: 150, width: 350 }} >
            <div className="Tilt-inner"> 
            <Card key={index} style={{width : '22rem',marginRight: '20px'}}>
              <CardBody style={{ background: "#B3C6E6" }}>
                <div className="row">
                  <div className="col-5" >
                    <div >
                      <Link to={{ pathname: `/backlog/${item._id}` }} >
                        {
                          !_.isEmpty(item.image) ?
                            <img className="avatar-image avatar-project" src={Config.API_URL + "/" + item.image}
                              height={96} width={96} />
                            : <img className="avatar-image avatar-project" src={'images/12.jpeg'}
                              height={96} width={96} />
                        }
                      </Link>
                    </div>
                  </div>
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
            </div>
            </Tilt>
        )
      })
    )
  }
  render() {
    const { project } = this.props;
    console.log(project)
    _.map(this.props.member, (item) => {
      this.hanleUserActive = item._id
    })
    return (
      <div className="row">
          {
            this.showCard()
          }
      </div>
    )
  }
}
