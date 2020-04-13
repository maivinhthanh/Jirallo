import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './TestingUI'
import * as action from './action'

class TestingContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    
    AddGroup = () =>{
        this.props.AddGroupTesting(this.props.report._id)
    }
    AddTesting = (index) =>{
        this.props.AddTesting(index)
    }
    updateObject = (text, name, indextest, index) =>{
        let testing = this.props.report.testing[indextest].content
        testing[index][name] = text
        
        const data = {
            idtesting: this.props.report.testing[indextest]._id,
            content : testing
        }
        this.props.UpdateContentTesting(this.props.report._id, data)
    }
    updateTitle = (text, indextest)=>{
        const data = {
            idtesting: this.props.report.testing[indextest]._id,
            title: text
        }
        this.props.UpdateTitleTesting(this.props.report._id, data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    AddGroup={this.AddGroup}
                    addTesting={this.AddTesting}
                    updateObject = {this.updateObject}
                    updateTitle={this.updateTitle}/>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddGroupTesting: (id) => dispatch(action.AddGroupTesting(id)),
        AddTesting: (index) => dispatch(action.AddTesting(index)),
        UpdateContentTesting: (id, data) => dispatch(action.UpdateContentTesting(id, data)),
        UpdateTitleTesting: (id, data) => dispatch(action.UpdateTitleTesting(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestingContainer)