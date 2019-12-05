import React, { Component } from "react";
import { connect } from "react-redux"

import ListUser from "../Components/User/ListUser";
import HeaderBoard from "../Components/Board/HeaderBoard";
import MenuLog from '../Components/BackLog/MenuLog';
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
} from "reactstrap";
import MenuBoard from "../Components/Board/MenuBoard";
import ListIssues from "../Components/BackLog/ListIssues";
import CreateSprint from '../Components/Sprint/modalCreate'
import ListDetailIssues from "../Components/BackLog/ListDetailIssues";
class BacklogPage extends Component {

  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div className="row">
        <div className="col-md-12 detail-card">
          <div className="board-header">
            <HeaderBoard />
          </div>
          <div className="col-md-12 container-fluid">
            <div className="filter">
              <p>Quick Filters: </p>
              <ListUser params={id} />
            </div>
            <div className="row content-backlog board-task">
              <div className="col-md-1">
                <MenuBoard />
              </div>
              <div className="col-md-2 epic-blacklog">
               <MenuLog params = {id}/>
              </div>
              <div className="col-md-8 defineIssue">
              {/* className={`list-sprint item-issue ${!modal ? "" : "customSprint"}`} */}
              <CreateSprint params={id}/>
               <ListDetailIssues params={id}/>
               {/* CreateIssue dang an */}
               <ListIssues params = {id}/>
              </div>
            </div>
          </div>
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
