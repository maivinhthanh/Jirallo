import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../Store/actions/auth';
import { Redirect } from 'react-router-dom';
import Login from '../../../Components/Auth/Login/Login'
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import swal from "sweetalert";
import _ from 'lodash'
class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state ={
      redirect: false,
      error: false
    }
  }
  componentWillUpdate(nextProps){
    console.log(nextProps)
    if(nextProps.user.code === 'ok'){
      this.setState({
        redirect: true
      })
    }
    if(nextProps.errorLogin.type === 'errorToken' && _.isEmpty(nextProps.user) ) {
    return (
      swal(`${nextProps.errorLogin.message}`)
    )
    }
  }
  haveRedirect(){
    if(this.state.redirect === true){
      return <Redirect to="/user" />
    }
    // if(this.state.error === true){
    //   return (
    //     swal("Hello world!")
    //   )
    // }
  }
  render() {
    return (
      <div>
      <Login email={this.props.email} password={this.props.password} login={this.props.login}
          loginbyfacebook = {this.props.loginbyfacebook} loginbygoogle = {this.props.loginbygoogle}
      />
      {this.haveRedirect()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      email: state.auth.email,
      password: state.auth.password,
      id: state.auth.id,
      error: state.auth.error,
      errorLogin: state.error,
      user : state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
      login: (email, password) => dispatch( actions.loginAction(email, password) ),
      loginbyfacebook: (data) => dispatch( actions.loginByFacebookAction(data) ),
      loginbygoogle: (data) => dispatch( actions.loginByGoogleAction(data) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(LoginContainer)
