import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './ProcessUI'
import * as action from './action'

class AddProcessContainer extends Component {
    
    render() {
        const { name } = this.props
        return (
            <div >
                <UI name={ name }/>
                
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProcessContainer)