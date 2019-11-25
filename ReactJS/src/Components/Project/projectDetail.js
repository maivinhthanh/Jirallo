import React, { Component } from "react";
import _ from "lodash";
import { Card, CardBody, CardTitle, CardSubtitle, Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
// import { AddMemberAct } from "../../Store/actions/project";
export default class projectDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal:false,
      emailUser: '',
      positionUser:'',
      // idUser: '',
      // userAdd : [],
    }
    this.showToggle = this.showToggle.bind(this)
    this.handleEmailUser = this.handleEmailUser.bind(this)
    this.handlePostionUser = this.handlePostionUser.bind(this)
    // this.addUser = this.addUser.bind(this)
    this.handleIdProject = ''
    this.hanleUserActive = ''
  }
  fomatDateTime(date) {
    return _.slice(_.replace(date, /-/g, "/"), 0, 10);
  }
  addUser =(idproject)=> {
    this.props.findUserEmail(this.state.emailUser)
    this.handleIdProject = idproject
  }
  componentDidUpdate(preState){
    !_.isEqual(preState.member, this.props.member) && this.handleAdd(this.props.member)
  }
  handleAdd(member){
    const userAdd = {_id:member[0]._id, position: this.state.positionUser}
    this.props.AddMemberAct(this.handleIdProject,userAdd)
  }
  showToggle(id){
    this.handleIdProject = id
    this.setState(preState => ({
      modal: !preState.modal
    }))
  }
  handleEmailUser(e){
    e.preventDefault()
    this.setState({
      emailUser: e.target.value
    })
  }
  handlePostionUser(e){
    e.preventDefault()
    this.setState({
      positionUser: e.target.value
    })
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
              <div className="detail-task-user">
                <CardBody style={{ background: "#B3C6E6" }}>
                  <div className="row">
                    <div className="col-10 text-center">
                      <CardTitle><h4>{item.name}</h4></CardTitle>
                    </div>
                    <div className="col-2">
                        <i
                          onClick={ this.showToggle.bind(this, item._id) }
                          style={{ float: "right", fontSize: '20px', color: '#1F53B6'}}
                          className="fas fa-user-plus"
                        ></i>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10 text-center">
                      <CardSubtitle>
                        Create day: {this.fomatDateTime(item.datecreate)}
                      </CardSubtitle>
                    </div>
                    <div className="col-2"></div>
                  </div>
                  
                  <div className="row">
                    <div className="col-6 text-center">
                      <Button style={{ background: "#1F53B6", marginTop: "20px" }}>
                        <Link to={{ pathname: `/backlog/${item._id}` }}>
                          <b style={{color: 'black'}}>View</b>
                        </Link>
                      </Button>
                    </div>
                    <div className="col-6 text-center">
                      <Button style={{ background: "#1F53B6", marginTop: "20px" }}>
                        <Link to={{ pathname: `/Profile/${item._id}` }}>
                          <b style={{color: 'black'}}>Info </b>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardBody>
                <div>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={ this.showToggle.bind(this, item._id) }
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
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
