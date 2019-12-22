import React, { Component } from "react";
import { connect } from "react-redux"

import ListUser from "../Components/User/ListUser";
import HeaderBackLog from "../Components/BackLog/HeaderBackLog";
import MenuLog from '../Components/BackLog/MenuLog';
import ListDetailIssues from "../Components/BackLog/ListDetailIssues";
import IteamHeader from '../Components/IteamHeader'
import MenuUser from '../Components/MenuUser/Menu'
import * as actionIssue from "../Store/actions/issues";
import * as actionSprint from "../Store/actions/sprint";

class BacklogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iduser: null,
    };
    
  }
  ChangeUser = (id, status) =>{
    const { match: { params } } = this.props
    if(!status){
      this.setState({
        iduser: id
      })
      this.props.showListIssueInBackLog(params.id, id)
      this.props.showListSprint(params.id, id)
    }
    else{
      this.props.showListIssueInBackLog(params.id, null)
      this.props.showListSprint(params.id, null)
    }
    
    
  }
  showListIssueInBackLog(id){
    this.props.showListIssueInBackLog(id, this.state.iduser)
  }
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div className="row">
        <MenuUser/>
        <div className="col-12">
          <div className="board-header">
            <HeaderBackLog params={id}/>
          </div>
          <div className='row'>
            <div className='col-1'>
              <IteamHeader params={id} />
            </div>
            <div className='col-11'>
              <div className='row'>
                <div className='col-12'>
                  <div className="filter">
                    <ListUser params={id} ChangeUser={this.ChangeUser}/>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className="col-2 epic-blacklog">
                      <MenuLog params={id} />
                    </div>
                    <div className="col-10 defineIssue">
                      <div className="row">
                        
                        <div className="col-12">
                          <ListDetailIssues params={id} 
                            showListIssueInBackLog={(id) =>this.showListIssueInBackLog(id)}/>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>




          <div className='row '>
            <div className='col-md-1'>

            </div>
            <div className='col-md-11'>

            </div>

          </div>

          {/* <div className="col-md-12 container-fluid">
            <div className="filter">
              <p>Quick Filters: </p>
              <ListUser params={id} />
            </div>
            <div className="row content-backlog board-task">
              <div className="col-md-1">
                <IteamHeader />
              </div>
            
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showListIssueInBackLog: (id, iduser) => dispatch(actionIssue.showListIssueInBackLog(id, iduser)),
    showListSprint: (id, iduser) => dispatch(actionSprint.showListSprintAct(id, iduser)),

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BacklogPage)
