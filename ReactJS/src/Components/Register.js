import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
export default class Register extends Component {
  render() {
    return (
      <div className="registerPage">
      <div className="container form-register">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h3>Register</h3>
            <label htmlFor="email">Full name:</label>
            <input
              required
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Enter full name"
              name="fullname"
              maxLength='30'
              minLength='9'
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              maxLength='30'
              minLength='9'
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              required
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
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
            Submit
          </button>
          <p className="txtPass" ><Link to="/login">Have a account ?</Link> </p>
        </form>
      </div>
      </div>
    )
  }
}
