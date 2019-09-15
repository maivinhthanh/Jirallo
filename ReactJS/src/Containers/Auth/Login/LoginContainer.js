import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../Store/actions/auth';
import { Link } from 'react-router-dom' 
import Login from '../../../Components/Auth/Login/Login'
class LoginContainer extends Component {
  
  render() {
    return (
      <Login email={this.props.email} password={this.props.password} login={this.props.login} />
    )
  }
}

const mapStateToProps = state => {
  return {
      email: state.auth.email,
      password: state.auth.password,
      id: state.auth.id,
      error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
      login: (email, password) => dispatch( actions.loginAction(email, password) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(LoginContainer)
