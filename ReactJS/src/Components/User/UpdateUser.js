import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../User/assets/style.css";
import * as action from "../../Store/actions/auth";
import { connect } from "react-redux";
class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      name: "",
      gender: ""
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleEmail(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
    console.log(this.state.email);
  }
  handlePass(e) {
    e.preventDefault();
    this.setState({
      pass: e.target.value
    });
  }
  handleName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  handleGender(e) {
    e.preventDefault();
    this.setState({
      gender: e.target.value
    });
  }
  handleSave(e) {
    e.preventDefault();
    const { id } = this.props;
    console.log(id)
    const updateUser = [
      {
        email: this.state.email,
        password: this.state.pass,
        name: this.state.name,
        gender: this.state.gender
      }
    ];
    this.props.EditUserAction(id, updateUser);
  }
  render() {
    const { id } = this.props;
    return (
      <div>
        <div className="container">
          {/* <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#myModal"
          > */}
          <i data-toggle="modal"
            data-target="#myModal" className="fas fa-cog"></i> Setting user
            {/* Update User
          </button> */}
          {/* The Modal */}
          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">Update User</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <div className="form-user">
                    <Form onSubmit={this.handleSave}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleEmail}
                          id="email"
                          required
                          placeholder="with a placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          onChange={this.handlePass}
                          value={this.state.pass}
                          id="pass"
                          required
                          placeholder="password placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                          type="text"
                          name="text"
                          id="name"
                          onChange={this.handleName}
                          value={this.state.name}
                          required
                          placeholder="name placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input
                          type="text"
                          name="text"
                          id="gender"
                          onChange={this.handleGender}
                          value={this.state.gender}
                          required
                          placeholder="gender placeholder"
                        />
                      </FormGroup>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                        <button
                          type="submit"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    EditUserAction: (id, user) => dispatch(action.EditUserAction(id, user))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(UpdateUser);
