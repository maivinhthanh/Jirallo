import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import Tilt from 'react-tilt'

import './main.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      password: props.password
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
  handleSubmit = (event) => {
    event.preventDefault();
    const user = [{ email: this.state.email, password: this.state.password }]
    localStorage.setItem('userLogin', JSON.stringify(user));
    this.props.login(this.state.email, this.state.password);
  }
  responseFacebook = (response) => {
    this.props.loginbyfacebook(response)

  }
  responseGoogle = async (response) => {
    setTimeout(await this.props.loginbygoogle(response.profileObj), 500)

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
                User Login
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

              <div className="wrap-input100 validate-input" data-validate = "Password is required">
                <input className="input100" required
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handlePass}
                maxLength='30'
                minLength='5' type="password" name="pass" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              
              <div className="container-login100-form-btn">
                <button className="btn-login login100-form-btn" onClick={this.handleSubmit}>
                <i className="fas fa-sign-in-alt"></i>
                  Login
                </button>
              </div>
              <div className=" container-login100-form-btn">

                  <FacebookLogin cssClass="btn-face login100-form-btn"
                    fields="name,email,picture" textButton="Facebook" icon="fab fa-facebook"
                    callback={this.responseFacebook}
                  />
              </div>

              <div className="container-login100-form-btn">
                <GoogleLogin
                  className="btn-google login100-form-btn" buttonText="Google" 
                  clientId="919009151118-m817ir6400ear78nlir3cpgo2nrjle1n.apps.googleusercontent.com"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </div>

              <div className="text-center p-t-12">
                
                <Link to="/fogotpassword">Forgot Password</Link>
                
              </div>

              <div className="text-center p-t-136">
                <Link to="/register">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
	    </div>
    )
  }
}

export default Login
