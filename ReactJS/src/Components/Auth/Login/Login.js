import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { Link, Route } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

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
      <div className="loginPage">
        <div className="container form-login">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h3>Login <i className="icon-user fas fa-user-plus"></i></h3>
              <label htmlFor="email">Email: <i className="fa fa-envelope"></i></label>
              <input
                required
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleEmail}
                maxLength='30'
                minLength='9'
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password: <i className="fa fa-key"></i></label>
              <input
                required
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter password"
                name="pswd"
                value={this.state.password}
                onChange={this.handlePass}
                maxLength='30'
                minLength='5'
              />
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" name="remember" />
                Remember me
            </label>
            </div>
            <button type="submit" className="submit-btn">
              Submit <i className="fas fa-paper-plane"></i>
            </button>
            <p className="txtPass" ><Link to="/register">Forgot Password ?</Link> </p>
          </form>
          <div className="App">

            <FacebookLogin
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
            <br />
            <GoogleLogin
              clientId="919009151118-m817ir6400ear78nlir3cpgo2nrjle1n.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
