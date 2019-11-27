import React, { Component, Fragment } from 'react'
import {PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap'
import { Link } from 'react-router-dom';

class SettingUser extends Component{
    // logout = () =>{
    //     localStorage.clear('user')
    //     return <Redirect to="/" />
    // }
    render(){
        return(
            <UncontrolledPopover  placement="left" trigger="legacy" 
                target={'Popover-avatar'} className="SettingUser"
            >
                <PopoverHeader>{this.props.name}</PopoverHeader>
                <PopoverBody>
                    <div className="row" onClick={this.logout}>
                        <div className="col-3"><i class="fas fa-sign-out-alt"></i></div>
                        <div className="col-9">
                            <Link to={{ pathname: `/` }} >
                              <b style={{color: 'black'}}>Log Out</b>
                            </Link>
                        </div>
                        
                    </div>
                </PopoverBody>
            </UncontrolledPopover >
        )
    }
}
export default SettingUser