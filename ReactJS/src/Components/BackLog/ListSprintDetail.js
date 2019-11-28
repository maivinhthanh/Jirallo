import React, { Component } from "react";
import IssueOnSprint from "./IssueOnSprint";
import _ from "lodash";
import InputField from './../InputEdit/inputField'
import WrapperDrop from "./WrapperDrop";
import Process from "../Board/Process";
export default class ListSprintDetail extends Component {
  deleteSprint(id){
    const {sprint} = this.props
    _.map(sprint, (item, index) => {
        if(item._id === id){
          sprint.splice(index, 1)
         }
    })
    this.props.handleDeleteSprint(id)
  }
  completeSprint(id){
    this.props.completeSprintAct(id)
  }
  beginSprint(idSprint, idProject){
    this.props.beginSprint(idSprint, idProject)
  }
  updateName = (data, id) =>{
    this.props.updateNameAct(data, id)
  }
  render() {
    const { sprint, user, admin, issues, modal } = this.props;
    const x = _.filter(sprint,(item) => item.hidden == false)
    return (
      <div>
        {_.map(_.filter(sprint,(item) => item.hidden == false), (data, key) => {
          return (
            <div
              className={`container sprint ${!modal ? "" : "layoutSprint"}`}
              key={key}
            >
              <li style={{ marginLeft: "-27px" }}>
              <InputField nameInput={'sprint'} sprint={sprint} newdata={(item,name) => this.updateName(item, data._id)}>{data.name}</InputField>
                {/* <InputField sprint={(data,name) => this.updateName(data, this.props.sprint.name)}>{data.name}</InputField> */}
                <div className="dropdown" style={{top:'-26px', left:'161px'}}>
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    style={{background:'transparent', border:'transparent'}}
                    data-toggle="dropdown"
                  >
                    <i className="fas fa-ellipsis-h setting-addsprint" style={{color: 'black'}}></i>
                  </button>
                  <div className="dropdown-menu">
                    <span className="dropdown-item">
                      Edit
                    </span>
                    <span className="dropdown-item" onClick={()=>this.deleteSprint(data._id)}>
                      Delete
                    </span>
                    <span className="dropdown-item" onClick={()=>this.beginSprint(data._id, this.props.params)}>
                      Begin
                    </span>
                    <span className="dropdown-item" onClick={()=>this.completeSprint(data._id)}>
                      Complete
                    </span>
                  </div>
                </div>
              </li>
              <div className={`optionbtn ${!modal ? "" : "custom"}`}>
                <IssueOnSprint
                  user={user}
                  admin={admin}
                  filterSprint={data}
                  issues={issues}
                  ViewListIssueInSprint={this.props.ViewListIssueInSprint}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

