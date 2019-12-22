import React, { Component } from "react";
import { connect } from "react-redux"

import ListUser from "../Components/User/ListUser";
import HeaderBoard from "../Components/Board/HeaderBoard";
import MenuLog from '../Components/BackLog/MenuLog';
import ListIssues from "../Components/BackLog/ListIssues";
import CreateSprint from '../Components/Sprint/modalCreate'
import ListDetailIssues from "../Components/BackLog/ListDetailIssues";
import IteamHeader from '../Components/IteamHeader'
import MenuUser from '../Components/MenuUser/Menu'
class BacklogPage extends Component {

  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div className="row">
        <MenuUser/>
        <div className="col-12">
          <div className="board-header">
            <HeaderBoard />
          </div>
          <div className='row'>
            <div className='col-1'>
              <IteamHeader params={id} />
            </div>
            <div className='col-11'>
              <div className='row'>
                <div className='col-12'>
                  <div className="filter">
                    <p>Quick Filters: </p>
                    <ListUser params={id} />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                  <div className="col-2 epic-blacklog">
                    <MenuLog params={id} />
                  </div>
                  <div className="col-10 defineIssue">
                    <div className="row">
                      {/* <div className="col-12">
                        <CreateSprint params={id} />
                      </div> */}
                      <div className="col-12">
                        <ListDetailIssues params={id} />
                      </div>
                      {/* <div className="col-12">
                        <ListIssues params={id} />
                      </div> */}
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
  };
};

export default connect(
  mapStateToProps,
  null
)(BacklogPage)
