import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as Config from '../../../Config';
import * as actions from '../action';
import MenuUI from './MenuUI2'
import MenuProjectUI from './MenuProjectUI2'

class MenuUser extends Component {
    constructor(props){
        super(props);
        
    }
    
    render() {
        console.log(this.props.idproject)
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
