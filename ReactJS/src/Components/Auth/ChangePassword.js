import React, { Component } from 'react'
import { connect } from "react-redux"
import Tilt from 'react-tilt'

import * as actions from '../../Store/actions/auth';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            comfirmpassword: '',

        }
      }
    handlePass = (event) => {
        event.preventDefault();
        this.setState({
          password: event.target.value
        })
    }
    handleComfirmPassword = (event) => {
        event.preventDefault();
        this.setState({
            comfirmpassword: event.target.value
        })
    }
    changePass = (event) => {
        event.preventDefault();
        if(this.state.password === this.state.comfirmpassword){
            this.props.changePass(this.props.match.params.token, this.state.password)
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
                            
                            <div className="wrap-input100 validate-input" data-validate = "">
                                <input className="input100" type="password" 
                                placeholder="Enter pass"
                                value={this.state.password}
                                onChange={this.handlePass}
                                maxLength='30'
                                minLength='3' />
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
                                minLength='3' />
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
                        </form>
                    </div>
                </div>
	        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePass: (token, password) => dispatch( actions.changePass(token, password) ),
    };
};

export default connect(
  null,mapDispatchToProps
)(ChangePassword)