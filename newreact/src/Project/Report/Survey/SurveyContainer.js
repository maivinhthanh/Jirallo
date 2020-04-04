import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './UI'
import * as action from './action'

class IntroduceContainer extends Component {
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
    PushImageSurvey = (image, name, idsurvey)=>{
        
        let data = new FormData()
        data.append('avatar',image)
        data.append('name',name)
        data.append('idsurvey',idsurvey)
        console.log(data)
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
        console.log(data)
        this.props.UpdateImageSurvey(this.props.report._id,data)
    }
    AddSurvey = ()=>{
        this.props.AddSurvey()
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                   EditAdvantages={this.EditAdvantages}
                   EditDefect={this.EditDefect}
                   AddParagraph={this.AddParagraph}
                   saveImage={this.PushImageSurvey}
                   AddSurvey={this.AddSurvey}
                   updateImage={this.UpdateImage} />
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
        AddSurvey: () => dispatch(action.AddSurvey()),
        UpdateImageSurvey: (id, data) =>dispatch(action.UpdateImageSurvey(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceContainer)