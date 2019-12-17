import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from "lodash";

import * as action from '../../Store/actions/project'
import UploadImage from '../InputEdit/UploadImage'

class EditProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueEmail: '',
            status: false,
            selected: 'developer',
            name:'',
            datecreate: '',
            dateedit: '',
            description: '',
            image: ''
        }
    }
    componentWillMount() {
        this.props.getInfoProject(this.props.params)
    }
    shouldComponentUpdate(nextProps, nextState){
        return this.props.project != nextProps.project
    }
    handleChangename = (e) =>{
        e.preventDefault();
        console.log(e.target.value)
        this.setState({
            name: e.target.value
        })
    }
    handleChangeDateEdit = (e) => {
        e.preventDefault();
        this.setState({
            dateedit: e.target.value
        })
    }
    hanleChangeDescript = (e) => {
        e.preventDefault();
        this.setState({
            description: e.target.value
        })
    }
    setAvatar = (data) => {
        this.setState({
            image: data
        });
    }
    editProject = () =>{
        let data = new FormData()
        data.append('avatar', this.state.image)
        data.append('dateedit',this.state.dateedit)
        data.append('description',this.state.description)
        data.append('name',this.state.name)
        this.props.EditProject(this.props.params, data)
    }
    render() {
        const { params, project } = this.props
        console.log(project)
        return (
            <div>
            {
                _.map(project, (item, index) =>{
                    return(
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                <p>Your project</p>
                                </div>
                                <div className="col-8">
                                <input className="form-control" type="text"
                                    value={this.state.name}
                                    onChange={this.handleChangename} />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-4">
                                <p>Date Edit</p>
                                </div>
                                <div className="col-8">
                                <input className="form-control" type="text"
                                    value={this.state.dateedit}
                                    onChange={this.handleChangeDateEdit} />
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-4">
                                <p>Descripton</p>
                                </div>
                                <div className="col-8">
                                <input className="form-control" type="text"
                                    value={this.state.description}
                                    onChange={this.hanleChangeDescript} />
                                </div>
                            </div>
                            <br/>
                            <div>
                                <UploadImage setAvatar={this.setAvatar} />
                            </div>
                            <button className="btn btn-primary" onClick={this.editProject}>Submit</button>
                        </div>
                    )
                            
                })
            }
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
    return {
        getInfoProject: (id) => dispatch(action.getInfoProject(id)),
        EditProject : (id, project) => dispatch(action.EditProject(id, project))
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProject)