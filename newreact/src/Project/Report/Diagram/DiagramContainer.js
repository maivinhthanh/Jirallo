import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './DiagramUI'
import * as action from './action'

class UsecaseContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    EditAdvantages = async (content, paragragh, key) =>{
        let data = this.props.report.survey
        data[key].advantages[paragragh] = content
        console.log(data)
        await this.props.EditSurvey(this.props.report._id, data)
    }
    EditDefect = async (content, paragragh, key) =>{
        let data = this.props.report.survey
        data[key].defect[paragragh] = content
        console.log(data)
        await this.props.EditSurvey(this.props.report._id, data)
    }
    
    AddParagraph = (data, key) => { 
        console.log(data, key)
        this.props.AddParagraph(data, key)
    }
    PushImageUsecase = (image, name, idusecase)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idusecase',idusecase)
        data.append('type','diagram')
        this.props.PushImageUsecase(this.props.report._id,data)
    }
    AddDiagram = ()=>{
        this.props.AddUsecase(this.props.report._id, "diagram")
    }
    DeleteImage = (idusecase, idimage) =>{
        const data = {
            idusecase: idusecase,
            idimage:idimage,
            type: 'diagram'
        }
        this.props.DeleteImageUsecase(this.props.report._id, data)
    }
    updateTitle = (name, idusecase) =>{
        const data = {
            type: 'diagram',
            name: name,
            idusecase: idusecase
        }
        this.props.UpdateTitleUsecase(this.props.report._id, data)
    }
    UpdateImage = (image, name, iddiagram, idimage) =>{
        let data = new FormData()
        if(image){
            data.append('avatar',image)
        }
        data.append('name',name)
        data.append('iddiagram',iddiagram)
        data.append('idimage',idimage)
        this.props.UpdateImageDiagram(this.props.report._id,data)
    }
    PushImage = (image, name, idusecase)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('type','diagram')
        data.append('idusecase',idusecase)
        this.props.PushImageUsecase(this.props.report._id,data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    AddDiagram={this.AddDiagram}
                    updateTitle={this.updateTitle}
                    deleteImage={this.DeleteImage}
                    updateImage={this.UpdateImage}
                    saveImage={this.PushImage}/>
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
        AddUsecase: (id, type) => dispatch(action.AddUsecase(id, type)),
        UpdateTitleUsecase: (id, data) => dispatch(action.UpdateTitleUsecase(id, data)),
        PushImageUsecase: (id, data) => dispatch(action.PushImageUsecase(id, data)),
        DeleteImageUsecase: (id, data) => dispatch(action.DeleteImageUsecase(id, data)),
        UpdateImageDiagram: (id, data) => dispatch(action.UpdateImageDiagram(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsecaseContainer)