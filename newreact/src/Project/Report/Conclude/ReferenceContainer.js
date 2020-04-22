import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './ReferenceUI'
import * as action from './action'

class ReferenceContainer extends Component {
    constructor(props) {
        super(props)
        this.urgencyRef = React.createRef();
        this.targetRef = React.createRef();
        this.structureRef = React.createRef();
    }

    EditReferences = (content, key) =>{
        let references = this.props.report.references
        references[key] = content

        const data = {
            references: references
        }
        this.props.EditReference(this.props.report._id, data)
    }
    AddParagraph = (data) => { 
        this.props.AddParagraph(data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    EditReferences={this.EditReferences}
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
        EditReference: (id, data) => dispatch(action.EditReference(id, data)),
        AddParagraph: (name) => dispatch(action.AddParagraphReference(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceContainer)