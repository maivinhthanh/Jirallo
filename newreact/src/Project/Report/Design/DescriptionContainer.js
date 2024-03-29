import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './DescriptionUI'
import * as action from './action'

class DescriptionContainer extends Component {
    
    EditDescript = async (content, paragragh) =>{
        let descript = this.props.report.descriptionWebsite
        descript[paragragh] = content
        const data = {
            descript: descript
        }
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