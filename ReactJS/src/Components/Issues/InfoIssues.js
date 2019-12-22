import React, { Component } from 'react'
import { connect } from "react-redux"

import * as actions from '../../Store/actions/issues'
import InputField from '../InputEdit/inputField'
import * as Config from '../../Config';

class InfoIssues extends Component {
    constructor(props) {
            super(props);
            this.state = {
                descript: "",
            };
        }
    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.issues !== this.props.issues 
    }
    updateNameIssue =(data, name) => {
        this.props.updateNameIssue(data, name)
    }
    updateDescriptIssue = (data, id) => {
        let issue = {
            descript: data
        }
        this.props.updateIssue(id, issue)
    }
    changeDescript = (e) =>{
        e.preventDefault();
        this.setState({
            descript: e.target.value
        });
    }
    render() {
        const {issues} = this.props
        return (
            <div className="row">
                <div className="col-9">
                    <div className="row">
                        <div className="col-2">
                            <p>Name</p>
                        </div>
                        <div className="col-10">
                            <InputField nameInput={'issue'} issues={issues} size="30px" arrow="10px" margin="10px"
                                changeName={(data,name) => this.updateNameIssue(data,issues._id)}>{issues.name}</InputField>
                        </div>
                        <div className="col-2">
                            <p>Description</p>
                        </div>
                        <div className="col-10">
                        <div ref={(input)=>{this.txtName = input}} 
                            style={{fontSize : '15px' , marginBottom : '10px',
                            height: '30px', display:'inline'}} 
                            onBlur={this.updateDescriptIssue}  value={issues.descript} className={`InputField`}  contenteditable="true" >
                            {issues.descript}
                        </div>
                        </div>
                        <br />
                        <div className="col-2">
                            <p>Comment</p>
                        </div>
                        <div className="col-10">
                            <textarea className="form-control" />
                        </div>
                    </div>
                    
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-6">
                            Reporter
                        </div>
                        {
                            !issues.repoter?(<div></div>):
                            (
                                <div className="col-6">
                                    {
                                        !issues.repoter.image? 
                                        (
                                            <img className="avatar-image" src={ Config.API_URL + "/" + issues.repoter.image} height={40} width={40}/>
                                        )
                                        :
                                        (
                                            <img className="avatar-image" src={Config.API_LOCAL + '/' + 'images/user-1.png' } height={40} width={40}/>
                                        )
                                    }
                                    <p>{issues.repoter.name}</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col-6">
                            Assignee
                        </div>
                        {
                            !issues.assignee?(<div></div>):
                            (
                                <div className="col-6">
                                    {
                                        !issues.assignee.image? 
                                        (
                                            <img className="avatar-image" src={ Config.API_URL + "/" + issues.assignee.image} height={40} width={40}/>
                                        )
                                        :
                                        (
                                            <img className="avatar-image" src={Config.API_LOCAL + '/' + 'images/user-1.png' } height={40} width={40}/>
                                        )
                                    }
                                    <p>{issues.assignee.name}</p>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    issues: state.issue,
    listissues: state.listissues
  };
};
const mapDispatchToProps = dispatch => {
    return {
        viewInfoIssues: (id) => dispatch(actions.viewInfoIssuesAct(id)),
        updateNameIssue: (name, id) => dispatch(actions.updateNameIssue(name, id)),
        updateIssue: (id, issue) => dispatch(actions.EditIssuesAct(id, issue)),
    }
  }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoIssues)