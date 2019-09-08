import React, { Component } from 'react'
export default class Content extends Component {
  render() {
    return (
      <div className="container contentTask">
        <p>Profile : Name </p>
        <div className="row">
          <div className="col-md-6 person-detail">
            <p>Summary</p>
            <div className="detail-profile">
              <ul>
                <li>Avata: img</li>
                <li>Username: nameUser</li>
                <li>Full name: Nguyen Van A</li>
                <li>Email: ABC@gmail.com</li>
                <li>Password: 123456</li>
                <li>Groups: nameGroup</li>
              </ul>
            </div>
            <div className="line"></div>
            <div className="detail-group">
              <p>Assigned Open Issues per Project</p>
            </div>
            <div className="line"></div>
          </div>
          <div className="col-md-6">
            <p>Activity Stream</p>
            <div className="history-user">
              <p>Date: 2019-10-10</p>
              <div className="detail-task-in-date">
                {/* code history */}
              </div>
            </div>
          </div>
          {/* <div className="dropdown">
          <div class="dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Dropdown button
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Link 1</a>
                <a class="dropdown-item" href="#">Link 2</a>
                <a class="dropdown-item" href="#">Link 3</a>
              </div>
            </div>
          </div> */}
          </div>
        </div>
    )
  }
}
