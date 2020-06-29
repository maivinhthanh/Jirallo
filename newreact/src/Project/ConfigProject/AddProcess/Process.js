import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    DeleteProcess = (name) =>{
        console.log(name)
        this.props.DeleteProcess(this.props.idproject,name)
    }
    render() {
        const { name } = this.props
        return (
            <div >
                <UI name={ name } changePosition={this.changePosition} DeleteProcess={this.DeleteProcess}/>
                
            </div>
        )
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddProcess: (id, process) => dispatch( action.AddProcess(id, process) ),
        DeleteProcess: (id, process) => dispatch( action.DeleteProcess(id, process) ),
    }
}

export default connect(null, mapDispatchToProps)(AddProcessContainer)