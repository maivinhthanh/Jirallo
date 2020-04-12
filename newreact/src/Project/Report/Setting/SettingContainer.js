import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './SettingUI'
import * as action from './action'

class SettingContainer extends Component {
    constructor(props) {
        super(props)
        
    }

    EditLanguage = (text, index)=>{
        let setting = this.props.report.setting
        setting.language[index] = text
        this.props.UpdateSetting(this.props.report._id,setting)
    }
    
    EditTechnology = (text, index)=>{
        let setting = this.props.report.setting
        setting.technology[index] = text
        this.props.UpdateSetting(this.props.report._id,setting)
    }
    
    EditStructure = (text, index) =>{
        let setting = this.props.report.setting
        setting.structure[index] = text
        this.props.UpdateSetting(this.props.report._id,setting)
    }
    
    AddParagraph = (name) =>{
        this.props.AddParagraph(name)
    }
    
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    EditLanguage={this.EditLanguage}
                    EditTechnology={this.EditTechnology}
                    EditStructure={this.EditStructure}
                    AddParagraph={this.AddParagraph}/>
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
        AddParagraph: (name) => dispatch(action.AddParagraph(name)),
        UpdateSetting: (id, data) => dispatch(action.UpdateSetting(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer)