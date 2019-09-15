import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Button, Input, Form } from "reactstrap";
import DetailUsers from "../../Components/User/DetailUser";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/admin";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      status: true
    };
  }
  handleChangeEmail = event => {
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  };
  handleSearch = event => {
    event.preventDefault();
    this.props.SearchEmail(this.state.email);
    this.setState({
      status: false
    });
  };
  render() {
    return (
      <div className="adminPage container-fluid">
        <div className="input-search-email">
          <Form onSubmit={this.handleSearch}>
            <InputGroup
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            >
              <Input />
              <InputGroupAddon>
                <Button type="submit" color="success">
                  Search!
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>
        <div className="detailUser">
          {!this.state.status && <DetailUsers admin={this.props} />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SearchEmail: email => dispatch(actions.SearchAction(email))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
