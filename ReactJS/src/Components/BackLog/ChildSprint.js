import React, { Component } from "react";
import {
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import _ from "lodash";
export default class ChildSprint extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     modal: false,
  //     status: false
  //   }
  //   this.idActive = '';
  //   this.itemActive = []
  // }
  // showContent(id){
  //   this.idActive = id
  //   this.setState({
  //     modal: true
  //   })
  // }
  // RedirectToUpdate = item => {
  //   this.setState({
  //     status: true
  //   })
  //   this.itemActive = item
  // }
  render() {
    const { data, modal } = this.props;

    return (
      <React.Fragment>
        {_.map(data, (item, key) => {
          return (
            <div
              className={`issues ${!modal ? "" : "custom"}`}
              style={{ float: "left", marginLeft: "75px" }}
            >
              <div className="nameIssue">
                <span onClick={() => this.props.showContent(item._id)}>{item.name}</span>
              </div>
              <i
                data-toggle="modal"
                data-target="#myModal"
                className="fas fa-cog setting-issue"
                // onClick={() => this.RedirectToUpdate(item)}
              ></i>
              <div className="option-add">
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    <i
                      class="fas fa-ellipsis-h setting-addsprint"
                      style={{ color: "black", marginTop: "-7px" }}
                    ></i>
                  </DropdownToggle>
                  <DropdownMenu>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
