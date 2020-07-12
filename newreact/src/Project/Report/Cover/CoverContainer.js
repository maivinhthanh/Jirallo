import React, { Component } from 'react'
import { connect } from 'react-redux'

import UI from './CoverUI'
import * as action from './action'

class ContentContainer extends Component {
    EditName = (name) =>{
        const data = {
            name: name,
            author: this.props.report.author,
            teacher: this.props.report.teacher,
            year: this.props.report.year,
            preface: this.props.report.preface
        }
        this.props.EditCover(this.props.report._id, data)
    }
    EditTeacher = (teacher) =>{
        const data = {
            name: this.props.report.name,
            author: this.props.report.author,
            teacher: teacher,
            year: this.props.report.year,
            preface: this.props.report.preface
        }
        this.props.EditCover(this.props.report._id, data)
    }
    EditYear = (year) =>{
        const data = {
            name: this.props.report.name,
            author: this.props.report.author,
            teacher: this.props.report.teacher,
            year: year,
            preface: this.props.report.preface
        }
        this.props.EditCover(this.props.report._id, data)
    }
    EditNameStudent = (value, index) =>{
        let author = this.props.report.author
        author[index].name = value
        const data = {
            name: this.props.report.name,
            author: author,
            teacher: this.props.report.teacher,
            year: this.props.report.year,
            preface: this.props.report.preface
        }
        this.props.EditCover(this.props.report._id, data)
    }
    EditCodeStudent = (value, index) =>{
        let author = this.props.report.author
        author[index].code = value
        const data = {
            name: this.props.report.name,
            author: author,
            teacher: this.props.report.teacher,
            year: this.props.report.year,
            preface: this.props.report.preface
        }
        this.props.EditCover(this.props.report._id, data)
    }
    render() {
        const { report } = this.props
        return (
            <div >
                <UI info={report} 
                    EditName={this.EditName}
                    EditYear={this.EditYear}
                    EditTeacher={this.EditTeacher}
                    EditNameStudent={this.EditNameStudent}
                    EditCodeStudent={this.EditCodeStudent}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)