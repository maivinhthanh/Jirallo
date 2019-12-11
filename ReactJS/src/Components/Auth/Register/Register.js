/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import { FormGroup, Label, Input } from 'reactstrap';
class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      name: '',
      avatar :'',
    }
  }
  handleChangeName =(event) =>{
    event.preventDefault();
    this.setState({
      name: event.target.value
    })
  }
  handleChangeEmail =(event)=>{
    event.preventDefault();
    this.setState({
      email : event.target.value
    })
  }
  handleChangePass =(event)=>{
    event.preventDefault();
    this.setState({
      password : event.target.value
    })
  }
  handleChangeFile =(event) =>{
    event.preventDefault();
    this.setState({
      avatar: event.target.value
    })
  }
  handleSubmit =(event)=>{
    event.preventDefault();
    const user = [{email:this.state.email, password:this.state.password,name: this.state.name,avatar:this.state.avatar,gender:this.state.gender}]
    this.props.Register(this.state.email,this.state.password,this.state.name,this.state.avatar,this.state.gender);
  }
  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/logo-login.jpg" alt="IMG" />
            </div>

            <form className="login100-form validate-form">
              <span className="login100-form-title">
                New user
              </span>

              <div className="wrap-input100 validate-input" data-validate = "Your name">
                <input className="input100" type="text" required
                placeholder="Enter full name"
                name="fullname"
                maxLength='30'
                value={this.state.name}
                onChange= {this.handleChangeName} />
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
                onChange = {this.handleChangeEmail} />
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
                  Sign Up
                </button>
              </div>

              <div className="text-center p-t-136">
                <Link to="/login">Log in</Link>
              </div>
            </form>
          </div>
        </div>
	    </div>
    )
  }
}
  export default Register 