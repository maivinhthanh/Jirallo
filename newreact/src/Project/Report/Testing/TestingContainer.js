import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './TestingUI'
import * as action from './action'

class TestingContainer extends Component {
    
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
    DeleteTesting = (idtesting)=>{
        this.props.DeleteTesting(this.props.report._id, idtesting)
    }
    DeleteObject = (idtesting, idobj)=>{
        this.props.DeleteObjectTesting(this.props.report._id, idtesting, idobj)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    AddGroup={this.AddGroup}
                    addTesting={this.AddTesting}
                    updateObject = {this.updateObject}
                    updateTitle={this.updateTitle}
                    deleteTesting={this.DeleteTesting}
                    deleteObject={this.DeleteObject}/>
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
        DeleteTesting: (id, idtesting) => dispatch(action.DeleteTesting(id, idtesting)),
        DeleteObjectTesting: (id, idtesting, idobj) => dispatch(action.DeleteObjectTesting(id, idtesting, idobj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestingContainer)