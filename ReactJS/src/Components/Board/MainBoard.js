import React, { Component } from 'react'
import TaskWork from '../Task/TaskWork'
import DescriptTask from '../Task/DescriptTask'
export default class MainBoard extends Component {
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
