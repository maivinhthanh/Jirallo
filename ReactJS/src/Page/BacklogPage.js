import React, { Component } from "react";
import ListUser from "../Components/User/ListUser";
import ItemBoard from "../Components/Board/ItemBoard";
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
class BacklogPage extends Component {
  
  render() {
    const { match: { params: { id } } } = this.props
    return (
      <div>
        <div className="detail-card">
          <div className="board-header">
            <HeaderBoard />
          </div>
          <div className="container-fluid">
            <div className="title-board">
              <p>Main Board</p>
              <div className="search-form">
                <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button color="secondary">search</Button>
                  </InputGroupAddon>
                </InputGroup>
                {/* <Button style={{float: 'right'}} color="warning">create sprint</Button> */}
              </div>
            </div>
            <div className="filter">
              <p>Quick Filters: </p>
              <ListUser />
           
            </div>
            <div className="row content-backlog board-task">
              <div className="col-md-1">
                <MenuBoard />
              </div>
              <div className="col-md-2 epic-blacklog">
               <MenuLog params = {id}/>
              </div>
              <div className="col-md-8">
              <Button style={{float: 'right', marginBottom:'35px'}} color="warning" >create sprint</Button>
                <div className="issues" style={{float: 'left', marginLeft:'75px'}}>
                  <span>Name Task: </span>
                </div>
               <ListIssues params = {id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BacklogPage