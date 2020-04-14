import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './DescriptionUI'
import * as action from './action'

class DescriptionContainer extends Component {
    constructor(props) {
        super(props)    
    }
    
    EditDescript = async (content, paragragh) =>{
        let descript = this.props.report.descriptionWebsite
        console.log(content, paragragh)
        descript[paragragh] = content
        const data = {
            descript: descript
        }
        console.log(data)
        await this.props.UpdateDescriptWebsite(this.props.report._id, data)
    }
    
    AddParagraph = (key) => { 
        this.props.AddParagraphDescriptWebsite(key)
    }
    
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                   EditDescript={this.EditDescript}
                   AddParagraph={this.AddParagraph}
                   />
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
        UpdateDescriptWebsite: (id, data) => dispatch(action.UpdateDescriptWebsite(id, data)),
        AddParagraphDescriptWebsite: (key) => dispatch(action.AddParagraphDescriptWebsite(key)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionContainer)