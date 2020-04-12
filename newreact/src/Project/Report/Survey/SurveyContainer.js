import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './SurveyUI'
import * as action from './action'

class SurveyContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    
    EditAdvantages = async (content, paragragh, key) =>{
        let data = this.props.report.survey
        data[key].advantages[paragragh] = content
        await this.props.EditSurvey(this.props.report._id, data)
    }
    EditDefect = async (content, paragragh, key) =>{
        let data = this.props.report.survey
        data[key].defect[paragragh] = content
        await this.props.EditSurvey(this.props.report._id, data)
    }
    
    AddParagraph = (data, key) => { 
        this.props.AddParagraph(data, key)
    }
    PushImageSurvey = (image, name, idsurvey)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idsurvey',idsurvey)
        this.props.PushImageSurvey(this.props.report._id,data)
    }
    UpdateImage = (image, name, idsurvey, idimage) =>{
        let data = new FormData()
        if(image){
            data.append('avatar',image)
        }
        data.append('name',name)
        data.append('idsurvey',idsurvey)
        data.append('idimage',idimage)
        this.props.UpdateImageSurvey(this.props.report._id,data)
    }
    AddSurvey = ()=>{
        this.props.AddSurvey(this.props.report._id)
    }
    DeleteImage = (idsurvey, idimage) =>{
        const data = {
            idsurvey: idsurvey,
            idimage:idimage
        }
        this.props.DeleteImageSurvey(this.props.report._id, data)
    }
    updateTitle = (name, idsurvey) =>{
        const data = {
            name: name,
            idsurvey: idsurvey
        }
        this.props.UpdateTitleSurvey(this.props.report._id, data)
    }
    render() {
        const { report } = this.props
        // console.log(this.listRef)
        let { props, ref } = React.forwardRef((props, ref) => ({ props, ref }))
        return (
            <div >
                <UI info={report} ref={ref}
                   EditAdvantages={this.EditAdvantages}
                   EditDefect={this.EditDefect}
                   AddParagraph={this.AddParagraph}
                   saveImage={this.PushImageSurvey}
                   AddSurvey={this.AddSurvey}
                   updateImage={this.UpdateImage}
                   deleteImage={this.DeleteImage}
                   updateTitle={this.updateTitle} />
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
        EditSurvey: (id, data) => dispatch(action.EditSurvey(id, data)),
        AddParagraph: (name, key) => dispatch(action.AddParagraph(name, key)),
        PushImageSurvey: (id, data) =>dispatch(action.PushImageSurvey(id, data)),
        AddSurvey: (id) => dispatch(action.AddSurvey(id)),
        UpdateImageSurvey: (id, data) =>dispatch(action.UpdateImageSurvey(id, data)),
        DeleteImageSurvey:(id, data)=>dispatch(action.DeleteImageSurvey(id, data)),
        UpdateTitleSurvey: (id, data)=>dispatch(action.UpdateTitleSurvey(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer)