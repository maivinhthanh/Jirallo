import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Tilt from 'react-tilt'

import * as actions from './action';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      
    }
  }
  handleEmail = (event) => {
    event.preventDefault();
    this.setState({
      email: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.sendEmail(this.state.email);
    this.setState({
        show: true
    })
  }
  
  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" >
            <Tilt className="Tilt" options={{ max : 40 }} style={{ height: 400, width: 400 }} >
              <div className="Tilt-inner"> 
                <img src="images/logo-login.jpg" alt="IMG" />
              </div>
            </Tilt>
              
            </div>

            <form className="login100-form validate-form">
              <span className="login100-form-title">
                Forgot Password
              </span>

              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" required
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleEmail}
                maxLength='30'
                minLength='9' />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              
              <div className="container-login100-form-btn">
                <button className="btn-login login100-form-btn" onClick={this.handleSubmit}>
                <i className="fas fa-sign-in-alt"></i>
                  Send Email
                </button>
              </div>
              <div className="text-center p-t-136">
                <Link to="/login">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
	    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      sendEmail: (email) => dispatch( actions.sendEmail(email) ),
  };
};

export default connect( null, mapDispatchToProps )(ForgotPassword)
