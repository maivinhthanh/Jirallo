import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './IntroduceUI'
import * as action from './action'

class IntroduceContainer extends Component {
    constructor(props) {
        super(props)
        this.urgencyRef = React.createRef();
        this.targetRef = React.createRef();
        this.structureRef = React.createRef();
    }
    EditUrgency = (content, key) =>{
        let urgency = this.props.report.introduce.urgency
        urgency[key] = content

        const data = {
            urgency: urgency,
            target: this.props.report.introduce.target,
            structure: this.props.report.introduce.structure,
        }
        this.props.EditIntroduce(this.props.report._id, data)
    }
    EditTarget = (content, key) =>{
        let target = this.props.report.introduce.target
        target[key] = content

        const data = {
            urgency: this.props.report.introduce.urgency,
            target: target,
            structure: this.props.report.introduce.structure,
        }
        this.props.EditIntroduce(this.props.report._id, data)
    }
    EditStructure = (content, key) =>{
        let structure = this.props.report.introduce.structure
        structure[key] = content

        const data = {
            urgency: this.props.report.introduce.urgency,
            target: this.props.report.introduce.target,
            structure: structure,
        }
        this.props.EditIntroduce(this.props.report._id, data)
    }
    AddParagraph = (data) => { 
        this.props.AddParagraph(data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    urgencyRef={el => this.urgencyRef = el}
                    targetRef={el => this.targetRef = el}
                    structureRef={el => this.structureRef = el}
                    EditUrgency={this.EditUrgency}
                    EditTarget={this.EditTarget}
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
        EditIntroduce: (id, data) => dispatch(action.EditIntroduce(id, data)),
        AddParagraph: (name) => dispatch(action.AddParagraph(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceContainer)