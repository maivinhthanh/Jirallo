import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class IteamHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      status : true
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'))
    const idproject = this.props.params
    if(user === null){
      user = {image : null}
    }
    return (
      <div>
        <ul className="nav_links list-unstyled">
            <li>
              <Link  to={{ pathname: `/backlog/${idproject}` }}>
                <span className="fas fa-stream" />
                <p>Backlog</p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: `/active/${idproject}` }}>
                  <span className="fas fa-columns"></span>
                  <p>ActiveSprint</p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: `/config/${idproject}` }}>
                  <span className="fas fa-cog"></span>
                  <p>Config</p>
              </Link>
            </li>
            <li>
              <a href="#blog">
                <span className="fa fa-chart-line" />
                <p>Chart</p>
              </a>
            </li>
          </ul>
      </div>
    )
  }
}
