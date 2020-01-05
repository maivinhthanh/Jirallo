import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardBody,
  UncontrolledCollapse,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from "reactstrap";
import classnames from "classnames";
import "./assets/style.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/epic";
import _ from "lodash";
import InputField from '../InputEdit/inputField'
class MenuLog extends Component {
  constructor(props) {
    super(props);
    this.nameItem = null;
    this.state = {
      activeTab: "1",
      modal: false,
      modalEpic: false,
      nameEpic: "",
      idProject: "",
      nameEpicEdit: this.nameItem
    };
    this.toggle = this.toggle.bind(this);
    this.showToggle = this.showToggle.bind(this);
    this.createEpic = this.createEpic.bind(this);
    this.showToggleEpic = this.showToggleEpic.bind(this);
    this.handleNameEpic = this.handleNameEpic.bind(this);
    this.activeItem = null;
  }
  createEpic(e) {
    e.preventDefault();
    const Epic = {
      nameEpic: this.state.nameEpic,
      idProject: this.props.params
    };
    this.props.createEpic(Epic);
    this.showToggle()
  }
  showListIssueOfEpic(id){
    this.props.showListIssueOfEpicAct(id)
  }
  showToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  showToggleEpic(id, name) {
    this.activeItem = id;
    this.nameItem = name;
    this.setState(prevState => ({
      modalEpic: !prevState.modalEpic
    }));
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidMount() {
    this.props.viewListEpic(this.props.params);
  }

  // Editepic(e) {
  //   e.preventDefault();
  //   this.props.EditepicAct(this.state.nameEpic, this.activeItem);
  //   this.showToggleEpic();
  // }
  handleNameEpic(e) {
    e.preventDefault();
    this.setState({
      nameEpic: e.target.value
    });
  }
  updateNameEpic = (name, id) => {
    this.props.updateNameEpic(name,id)
  }
  render() {
    const epic = this.props.Epic;
    return (
      <div className="show-epic">
        <Row>
          <Col sm="12">
            <Card body className="card-content-epic">
              <CardTitle>
                <span>Epic</span>{" "}
                <span onClick={this.showToggle}>Create Epic</span>
                <div>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.showToggle}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.showToggle}>
                      Create Epic
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        type="text"
                        onChange={this.handleNameEpic}
                        value={this.state.nameEpic}
                        style={{ marginBottom: "10px" }}
                        name="epic"
                        id="ecpic"
                        placeholder="with name ecpic"
                      />
                      {/* <Input
                        type="text"
                        onChange={this.handleIdProject}
                        value={this.state.idProject}
                        name="Idproject"
                        id="Idproject"
                        placeholder="with name idproject"
                      /> */}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={this.createEpic}
                      >
                        Add
                      </Button>{" "}
                      <Button color="secondary" onClick={this.showToggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardTitle>
              <React.Fragment>
                {_.map(epic, (item, index) => {
                  if (index < 5) {
                    return (
                      <tr key={index} style={{ textAlign: "initial" }}>
                        <td id="toggler" key={item._id}>
                          <span className="epic-name" onClick={() => this.showListIssueOfEpic(item._id)}>
                          <InputField nameInput={'epic'} epic={epic} editNameEpic={(data,name) => this.updateNameEpic(data,item._id)}>{item.name}</InputField>
                          {/* <i class="fas fa-angle-double-down" onClick={this.showListIssueOfEpic(item._id)}></i> */}
                          </span>
                          {/* <i
                            onClick={() =>
                              this.showToggleEpic(item._id, item.name)
                            }
                            style={{
                              float: "right",
                              marginLeft: "150px",
                              marginTop: "-8px"
                            }}
                            className="fas fa-cog"
                          ></i> */}
                        </td>
                      </tr>
                    );
                  }
                })}
                 <Button
                  color="primary"
                  id="toggler1"
                  style={{ marginBottom: "1rem" }}
                >
                  Toggle
                </Button>
                {/* <UncontrolledCollapse toggler="#toggler1" style={{width:'100%'}}>
                  <Card>
                    <CardBody>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nesciunt magni, voluptas debitis similique porro a
                      molestias consequuntur earum odio officiis natus, amet
                      hic, iste sed dignissimos esse fuga! Minus, alias.
                    </CardBody>
                  </Card>
                </UncontrolledCollapse> */}
              </React.Fragment>
              {/* <div> */}
                {/* <Button
                  color="primary"
                  id="toggler"
                  style={{ marginBottom: "1rem" }}
                >
                  Toggle
                </Button> */}
                
              {/* </div> */}
              {/* <Button
                    data-toggle="collapse"
                    data-target="#demo1"
                    outline
                    color="warning"
                  >
                    All issues
                  </Button> */}
              {/* <div id="demo" className="collapse">
                <div>
                  <Modal
                    isOpen={this.state.modalEpic}
                    toggle={this.showToggleEpic}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.showToggleEpic}>
                      Edit Epic
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        type="text"
                        onChange={this.handleNameEpicEdit}
                        value={this.nameEpic}
                        style={{ marginBottom: "10px" }}
                        name="epic"
                        id="ecpic1"
                        placeholder="with name epic"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={this.Editepic}
                      >
                        Edit
                      </Button>{" "}
                      <Button color="secondary" onClick={this.showToggleEpic}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div> */}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Epic: state.epic
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createEpic: epic => dispatch(actions.createEpicAct(epic)),
    viewListEpic: idProject => dispatch(actions.viewListEpicAct(idProject)),
    EditepicAct: (nameEpic, id) => dispatch(actions.EditepicAct(nameEpic, id)),
    updateNameEpic:(name, id) => dispatch(actions.updateNameEpic(name, id)),
    showListIssueOfEpicAct:(id) => dispatch(actions.showListIssueOfEpicAct(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuLog);
