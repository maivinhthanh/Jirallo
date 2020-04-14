import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './TheoryUI'
import * as action from './action'

class TheoryContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    
    EditContent = async (text, paragragh, key) =>{
        let content = this.props.report.theory[key].content
        content[paragragh] = text
        const data = {
            content: content,
            idtheory : this.props.report.theory[key]._id
        }
        await this.props.UpdateContentTheory(this.props.report._id, data)
    }
    
    AddParagraph = (name,key) => { 
        this.props.AddParagraph(key)
    }
    PushImageSurvey = (image, name, idtheory)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idtheory',idtheory)
        this.props.PushImageTheory(this.props.report._id,data)
    }
    UpdateImage = (image, name, idtheory, idimage) =>{
        let data = new FormData()
        if(image){
            data.append('avatar',image)
        }
        data.append('name',name)
        data.append('idtheory',idtheory)
        data.append('idimage',idimage)
        this.props.UpdateImageTheory(this.props.report._id,data)
    }
    AddTheory = ()=>{
        this.props.AddTheory(this.props.report._id)
    }
    DeleteImage = (idtheory, idimage) =>{
        const data = {
            idtheory: idtheory,
            idimage:idimage
        }
        this.props.DeleteImageTheory(this.props.report._id, data)
    }
    updateTitle = (name, idtheory) =>{
        const data = {
            title: name,
            idtheory: idtheory
        }
        this.props.UpdateTitleTheory(this.props.report._id, data)
    }
    deleteTheory = (idtheory) =>{
        this.props.DeleteTheory(this.props.report._id, idtheory)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                   EditContent={this.EditContent}
                   AddParagraph={this.AddParagraph}
                   saveImage={this.PushImageSurvey}
                   AddTheory={this.AddTheory}
                   updateImage={this.UpdateImage}
                   deleteImage={this.DeleteImage}
                   updateTitle={this.updateTitle} 
                   deleteTheory={this.deleteTheory}/>
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
        UpdateContentTheory: (id, data) => dispatch(action.UpdateContentTheory(id, data)),
        AddParagraph: (key) => dispatch(action.AddParagraph(key)),
        PushImageTheory: (id, data) =>dispatch(action.PushImageTheory(id, data)),
        AddTheory: (id) => dispatch(action.AddTheory(id)),
        UpdateImageTheory: (id, data) =>dispatch(action.UpdateImageTheory(id, data)),
        DeleteImageTheory:(id, data)=>dispatch(action.DeleteImageTheory(id, data)),
        UpdateTitleTheory: (id, data)=>dispatch(action.UpdateTitleTheory(id, data)),
        DeleteTheory: (id, idtheory)=>dispatch(action.DeleteTheory(id, idtheory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheoryContainer)