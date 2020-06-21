import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../action';
import MenuUI from './MenuUI2'
import MenuProjectUI from './MenuProjectUI2'

class MenuUser extends Component {
   
    render() {
        return (
            <div className="Main-Menu">
                <MenuUI />
                <MenuProjectUI idproject={this.props.idproject}/>                    
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
