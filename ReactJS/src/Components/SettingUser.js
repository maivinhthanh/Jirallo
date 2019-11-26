import React, { Component, Fragment } from 'react'
import {PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap'

class SettingUser extends Component{
    render(){
        return(
            <UncontrolledPopover  placement="left" trigger="legacy" 
                target={'Popover-avatar'} className="SettingUser"
            >
                <PopoverHeader>Setting</PopoverHeader>
                <PopoverBody>
                    
                </PopoverBody>
            </UncontrolledPopover >
        )
    }
}
export default SettingUser