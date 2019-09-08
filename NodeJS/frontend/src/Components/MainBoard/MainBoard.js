import React, { Component } from 'react'
import TaskWork from './TaskWork/TaskWork';
import DescriptTask from './Description/DescriptTask';
class MainBoard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-9">
            <TaskWork/>
          </div>
          <div className="col-md-3">
            <DescriptTask/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default MainBoard
