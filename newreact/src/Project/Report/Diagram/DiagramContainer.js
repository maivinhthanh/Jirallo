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
    PushImageUsecase = (image, name, idsurvey)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idsurvey',idsurvey)
        this.props.PushImageSurvey(this.props.report._id,data)
    }
    AddDiagram = ()=>{
        this.props.AddUsecase(this.props.report._id, "diagram")
    }
    DeleteImage = (idsurvey, idimage) =>{
        const data = {
            idsurvey: idsurvey,
            idimage:idimage
        }
        this.props.DeleteImageSurvey(this.props.report._id, data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    AddDiagram={this.AddDiagram}/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsecaseContainer)