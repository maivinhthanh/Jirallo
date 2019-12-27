import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Tilt from 'react-tilt'
import _ from 'lodash'

import * as actions from '../../Store/actions/auth';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      comfirmpassword: '',
      code: '',
      show:false
    }
  }
  handleEmail = (event) => {
    event.preventDefault();
    this.setState({
      email: event.target.value
    })
  }
  handlePass = (event) => {
    event.preventDefault();
    this.setState({
      password: event.target.value
    })
  }
  handleCode = (event) => {
    event.preventDefault();
    this.setState({
      code: event.target.value
    })
  }
  handleComfirmPassword = (event) => {
    event.preventDefault();
    this.setState({
      comfirmpassword: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.sendEmail(this.state.email);
    this.setState({
        show: true
    })
  }
  changePass  = (event) => {
    if(this.state.password === this.state.comfirmpassword){
        this.props.changePass(this.state.email, this.state.code, this.state.password);
    }
    
    
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
                {
                    this.state.show ? (
                        <div>
                            <div className="wrap-input100 validate-input" data-validate = "">
                                <input className="input100" type="text" required
                                placeholder="Enter Code"
                                value={this.state.code}
                                onChange={this.handleCode}
                                maxLength='30'
                                minLength='9' />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate = "">
                                <input className="input100" type="password" 
                                placeholder="Enter pass"
                                value={this.state.password}
                                onChange={this.handlePass}
                                maxLength='30'
                                minLength='9' />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate = "">
                                <input className="input100" type="password"
                                placeholder="Enter email"
                                value={this.state.comfirmpassword}
                                onChange={this.handleComfirmPassword}
                                maxLength='30'
                                minLength='9' />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="btn-login login100-form-btn" onClick={this.changePass}>
                                <i className="fas fa-sign-in-alt"></i>
                                Change Password
                                </button>
                            </div>
                        </div>
                    ):
                    (
                        <div></div>
                    )
                }
              

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
const mapStateToProps = state => {
    return {
        
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        sendEmail: (email) => dispatch( actions.sendEmail(email) ),
        changePass: (email, code, password) => dispatch( actions.changePass(email, code, password) ),
    };
  };
export default connect( mapStateToProps, mapDispatchToProps )(ForgotPassword)
