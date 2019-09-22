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
class BacklogPage extends Component {
  render() {
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
               <MenuLog/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BacklogPage;
