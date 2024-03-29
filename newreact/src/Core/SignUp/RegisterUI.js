/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import Tilt from 'react-tilt'

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      firstname: '',
      lastname: '',
      avatar :'',
    }
  }
  
  handleChange =(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  
  handleSubmit =(event)=>{
    event.preventDefault();
    this.props.Register(this.state.email,this.state.password,this.state.firstname,this.state.lastname,this.state.gender);
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
                New user
              </span>

              <div className="wrap-input100 validate-input" data-validate = "Your name">
                <input className="input100" type="text" required
                placeholder="Enter first name"
                name="firstname"
                maxLength='30'
                value={this.state.name}
                onChange= {this.handleChange} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate = "Your name">
                <input className="input100" type="text" required
                placeholder="Enter last name"
                name="lastname"
                maxLength='30'
                value={this.state.name}
                onChange= {this.handleChange} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" required
                  placeholder="Enter email"
                  name="email"
                  maxLength='30'
                  minLength='9'
                  value = {this.state.email}
                  onChange = {this.handleChange} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate = "Password is required">
                <input className="input100" required
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  maxLength='30'
                  minLength='5' type="password" name="password" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              
              <div className="container-login100-form-btn">
                <button className="btn-login login100-form-btn" onClick={this.handleSubmit}>
                <i className="fas fa-sign-in-alt"></i>
                  Sign Up
                </button>
              </div>

              <div className="text-right mt-3">
                <Link to="/login">Log in <i className="fas fa-sign-in-alt"></i></Link>
              </div>
            </form>
          </div>
        </div>
	    </div>
    )
  }
}
  export default Register 