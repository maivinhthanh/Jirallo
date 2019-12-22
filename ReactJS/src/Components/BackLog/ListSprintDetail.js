import React, { Component } from "react";
import IssueOnSprint from "./IssueOnSprint";
import _ from "lodash";
import InputField from './../InputEdit/inputField'
import WrapperDrop from "./WrapperDrop";
import Process from "../Board/Process";
// import Select from 'react-select';
// export const colourOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
//   { value: 'purple', label: 'Purple', color: '#5243AA' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

export default class ListSprintDetail extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     isDisabled: true,
  //     isLoading: false,
  //     isClearable: false,
  //     isRtl: false,
  //     isSearchable:true
  //   }
  // }
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
    const { sprint, user, admin, issues, modal, params, issueOnSprint } = this.props;
    const {isDisabled, isLoading, isClearable, isRtl, isSearchable} = this.props
    const x = _.filter(sprint,(item) => item.hidden == false)
    console.log(this.props.sprint)
    return (
      <div>
        {_.map(_.filter(sprint,(item) => item.hidden == false), (data, key) => {
          return (
            <div
            className='sprint'
              // className={`container sprint ${!modal ? "" : "layoutSprint"}`}
              key={key}
            >
              <li style={{ marginLeft: "-27px" }}>
              <i className="fas fa-ellipsis-h setting-addsprint" style={{color: 'black', marginRight:'10px'}}></i>
              <InputField nameInput={'sprint'} sprint={sprint} newdata={(item,name) => this.updateName(item, data._id)}>{data.name}</InputField>
              <span style={{marginLeft: '10px', color: '#7A869A'}}>{data.idissues.length} issues</span>
             <span style={{position:'absolute', top:'27px', left:'103px', color: '#7A869A'}}>{data.datecreate}</span>
                {/* <InputField sprint={(data,name) => this.updateName(data, this.props.sprint.name)}>{data.name}</InputField> */}
                <div className="dropdown" style={{top:'-26px', left:'161px'}}>
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    style={{height:'30px', border:'transparent'}}
                    data-toggle="dropdown"
                  >
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
              <div className='optionbtn'>
              {/* <div className={`optionbtn ${!modal ? "" : "custom"}`}> */}
                <IssueOnSprint
                  issueOnSprint={issueOnSprint}
                  params={params}
                  user={user}
                  admin={admin}
                  filterSprint={data}
                  issues={issues}
                  ViewListIssueInSprint={this.props.ViewListIssueInSprint}
                  loadDataIssue={this.props.loadDataIssue}
                />
              </div>
              {/* <div className="create">
              <createSprint params={params}/>
              </div> */}
            </div>
          );
        })}
      </div>
    );
  }
}

