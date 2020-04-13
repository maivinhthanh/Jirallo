import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import UI from './ConcludeUI'
import * as action from './action'

class ConcludeContainer extends Component {
    constructor(props) {
        super(props)
        this.urgencyRef = React.createRef();
        this.targetRef = React.createRef();
        this.structureRef = React.createRef();
    }
    EditDefect = (content, key) =>{
        let defect = this.props.report.conclude.defect
        defect[key] = content

        const data = {
            defect: defect,
            advantages: this.props.report.conclude.advantages,
            result: this.props.report.conclude.result,
            development: this.props.report.conclude.development,
        }
        this.props.EditConclude(this.props.report._id, data)
    }
    EditAdvantages = (content, key) =>{
        let advantages = this.props.report.conclude.advantages
        advantages[key] = content

        const data = {
            defect: this.props.report.conclude.defect,
            advantages: advantages,
            result: this.props.report.conclude.result,
            development: this.props.report.conclude.development,
        }
        this.props.EditConclude(this.props.report._id, data)
    }
    EditResult = (content, key) =>{
        let result = this.props.report.conclude.result
        result[key] = content

        const data = {
            defect: this.props.report.conclude.defect,
            advantages: this.props.report.conclude.advantages,
            result: result,
            development: this.props.report.conclude.development,
        }
        this.props.EditConclude(this.props.report._id, data)
    }
    EditDevelopment = (content, key) =>{
        let development = this.props.report.conclude.development
        development[key] = content

        const data = {
            defect: this.props.report.conclude.defect,
            advantages: this.props.report.conclude.advantages,
            result: this.props.report.conclude.result,
            development: development
        }
        this.props.EditConclude(this.props.report._id, data)
    }
    AddParagraph = (data) => { 
        this.props.AddParagraph(data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    resultRef={el => this.resultRef = el}
                    advantagesRef={el => this.advantagesRef = el}
                    defectRef={el => this.defectRef = el}
                    developmentRef={el => this.developmentRef = el}
                    EditResult={this.EditResult}
                    EditAdvantages={this.EditAdvantages}
                    EditDefect={this.EditDefect}
                    EditDevelopment={this.EditDevelopment}
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
        EditConclude: (id, data) => dispatch(action.EditConclude(id, data)),
        AddParagraph: (name) => dispatch(action.AddParagraphConclude(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcludeContainer)