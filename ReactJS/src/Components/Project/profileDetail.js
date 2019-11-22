import React, { Component } from "react";
import _ from "lodash";
import style from './assets/style.css'
import TableProject from '../Project/tableProject'
import * as action from '../../Store/actions/project'
import { connect } from 'react-redux'
import * as actionAuth from '../../Store/actions/member'
class profileDetail extends Component {
    componentDidMount() {
        this.props.getInfoProject(this.props.params)
    }
    render() {
        const { project, member } = this.props
        return (
            <div className="profileProject">
                <div className="content-left">
                    <TableProject
                        params={this.props.params}
                        project={project}
                        member={member}
                        EditProject={this.props.EditProject}
                        AddMemberIntoProject={this.props.AddMemberIntoProject}
                        searchEmail={this.props.searchEmail} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        project: state.project,
        member: state.member
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getInfoProject: (id) => dispatch(action.getInfoProject(id)),
        searchEmail: (email) => dispatch(actionAuth.SearchAction(email)),
        AddMemberIntoProject : (idproject, user) => dispatch(action.AddMemberAct(idproject,user)),
        EditProject : (project) => dispatch(action.EditProject(project))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(profileDetail)
