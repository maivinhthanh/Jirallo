import React, { Component, Fragment } from 'react'
import {PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../Store/actions/auth';

class SettingUser extends Component{
    constructor(props){
        super(props);
        this.state ={
          redirect: false
        }
    }
    logout = () =>{
        this.props.logout()
        this.setState({
            redirect: true
        })
    }
    haveRedirect(){
        if(this.state.redirect === true){
          return <Redirect to="/login" />
        }
    }
    render(){
        return(
            <div>
                <UncontrolledPopover  placement="left" trigger="legacy" 
                    target={'Popover-avatar'} className="SettingUser"
                >
                    <PopoverHeader>{this.props.name}</PopoverHeader>
                    <PopoverBody>
                        <div className="row" onClick={this.logout}>
                            <div className="col-3"><i className="fas fa-sign-out-alt"></i></div>
                            <div className="col-9">
                                <Link to={{ pathname: `/` }} >
                                <b style={{color: 'black'}}>Log Out</b>
                                </Link>
                            </div>
                            
                        </div>
                    </PopoverBody>
                    
                </UncontrolledPopover >
                {this.haveRedirect()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user : state.auth
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch( actions.logout() ),

    };
};
export default connect( mapStateToProps, mapDispatchToProps )(SettingUser)