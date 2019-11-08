import React, { Component } from "react";
import IssueOnSprint from "./IssueOnSprint";
import _ from "lodash";
export default class ListSprintDetail extends Component {
  render() {
    const { sprint, user, admin, issues, modal } = this.props;
    console.log(sprint)
    return (
      <div>
        {_.map(sprint, (data, key) => {
          console.log(data)
          return (
            <div className={`container sprint ${!modal ? "" : "layoutSprint"}`} key={key}>
              <li style={{ marginLeft: "-27px" }} >
                {data.name}
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
