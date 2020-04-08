import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './UsecaseUI'
import * as action from './action'

class UsecaseContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    
    AddParagraph = (data, key) => { 
        this.props.AddParagraph(data, key)
    }
    PushImageUsecase = (image, name, idusecase)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idusecase',idusecase)
        data.append('type','usecase')
        this.props.PushImageUsecase(this.props.report._id,data)
    }
    AddUsecase = ()=>{
        this.props.AddUsecase(this.props.report._id, "usecase")
    }
    DeleteImage = (idusecase, idimage) =>{
        const data = {
            idusecase: idusecase,
            idimage:idimage,
            type: 'usecase'
        }
        this.props.DeleteImageUsecase(this.props.report._id, data)
    }
    updateTitle = (name, idusecase) =>{
        const data = {
            type: 'usecase',
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
        data.append('type','usecase')
        data.append('idusecase',idusecase)
        this.props.PushImageUsecase(this.props.report._id,data)
    }
    updateUsecase = (name, text, index)=>{
        let descript = {}
        descript.key = this.props.report.usecase.descript[index].key
        descript.name = this.props.report.usecase.descript[index].name
        descript.briefdescript = this.props.report.usecase.descript[index].briefdescript
        descript.actor = this.props.report.usecase.descript[index].actor
        descript.precondition = this.props.report.usecase.descript[index].precondition
        descript.postcondition = this.props.report.usecase.descript[index].postcondition
        descript.idusecase = this.props.report.usecase.descript[index]._id

        descript[name] = text
        this.props.UpdateUsecase(this.props.report._id, descript)
    }
    EditBrief = (content, paragragh, key)=>{
        let descript = {}
        descript.key = this.props.report.usecase.descript[key].key
        descript.name = this.props.report.usecase.descript[key].name
        descript.briefdescript = this.props.report.usecase.descript[key].briefdescript
        descript.actor = this.props.report.usecase.descript[key].actor
        descript.precondition = this.props.report.usecase.descript[key].precondition
        descript.postcondition = this.props.report.usecase.descript[key].postcondition
        descript.idusecase = this.props.report.usecase.descript[key]._id

        descript.briefdescript[paragragh] = content
        this.props.UpdateUsecase(this.props.report._id, descript)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    AddUsecase={this.AddUsecase}
                    updateTitle={this.updateTitle}
                    updateUsecase={this.updateUsecase}
                    addParagraph={this.AddParagraph}
                    deleteImage={this.DeleteImage}
                    updateImage={this.UpdateImage}
                    saveImage={this.PushImage}
                    EditBrief={this.EditBrief}/>
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
        UpdateUsecase: (id, data) => dispatch(action.UpdateUsecase(id, data)),
        AddParagraph: (data, key) => dispatch(action.AddParagraph(data, key)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsecaseContainer)