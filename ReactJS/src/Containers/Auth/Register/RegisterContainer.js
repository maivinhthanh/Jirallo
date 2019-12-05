import { connect } from 'react-redux';
import React, { Component } from 'react'
import * as actions from '../../../Store/actions/auth';
import Register from '../../../Components/Auth/Register/Register'
class RegisterContainer extends Component {
  render() {
    return (
      <Register email={this.props.email} password={this.props.password}
        fullname={this.props.fullname} avatar={this.props.avatar} gender={this.props.gender}
        Register={this.props.Register}
      />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    avatar: state.auth.image,
    gender: state.auth.gender,
    password: state.auth.password,
    fullname: state.auth.fullname,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    Register: (email, password, fullname, avatar, gender) => dispatch(actions.RegisterAction(email, password, fullname, avatar, gender))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
