import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'

import * as Config from '../../../Config';
import * as actions from '../action';
import MenuUI from './MenuUI2'

class MenuUser extends Component {
    constructor(props){
        super(props);
    }

    logout = () =>{
        Cookies.remove('token')
        Cookies.remove('refreshtoken')
        this.props.logout()
        this.setState({
            
            redirect: true
        })
    }

    render() {

        return (
            <div className="Main-Menu">
                <MenuUI/>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch( actions.logout() ),

    };
};
export default connect( null, mapDispatchToProps )(MenuUser)
