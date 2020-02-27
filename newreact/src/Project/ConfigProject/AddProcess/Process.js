import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './ProcessUI'
import * as action from './action'

class AddProcessContainer extends Component {
    changePosition = (drog, drap) =>{
        const { listprocess } = this.props
        let arr = listprocess
        let indexDrop = listprocess.findIndex(e => e === drog.name)
        let indexDrap = listprocess.findIndex(e => e === drap.process)
        arr[indexDrop] = drap.process
        arr[indexDrap] = drog.name
        this.props.AddProcess(this.props.idproject, arr)
    }
    render() {
        const { name } = this.props
        return (
            <div >
                <UI name={ name } changePosition={this.changePosition}/>
                
            </div>
        )
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddProcess: (id, process) => dispatch( action.AddProcess(id, process) ),
    }
}

export default connect(null, mapDispatchToProps)(AddProcessContainer)