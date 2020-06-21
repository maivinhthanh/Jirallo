import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './PrefaceUI'
import * as action from '../Cover/action'

class PrefaceContainer extends Component {
    EditPreface = (preface) =>{
        const data = {
            name: this.props.report.name,
            author: this.props.report.author,
            teacher: this.props.report.teacher,
            year: this.props.report.year,
            preface: preface
        }
        this.props.EditCover(this.props.report._id, data)
    }
  
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                EditPreface={this.EditPreface}/>
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
        EditCover: (id, data) => dispatch(action.EditCover(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrefaceContainer)