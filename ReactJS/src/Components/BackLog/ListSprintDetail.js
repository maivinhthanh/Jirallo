import React, { Component } from "react";
import IssueOnSprint from "./IssueOnSprint";
import _ from "lodash";
export default class ListSprintDetail extends Component {
  render() {
    const { sprint, user, admin, issues, modal } = this.props;
    console.log(sprint);
    return (
      <div>
        {_.map(sprint, (data, key) => {
          return (
            <div
              className={`container sprint ${!modal ? "" : "layoutSprint"}`}
              key={key}
            >
              <li style={{ marginLeft: "-27px" }}>
                {data.name}
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
                    <a className="dropdown-item" href="#">
                      Edit
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete
                    </a>
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
