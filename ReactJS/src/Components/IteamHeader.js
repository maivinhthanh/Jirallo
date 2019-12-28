import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import CallApi from "../until/apiCaller";

export default class IteamHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      status : true,
      auth: true
    }
  }
  async componentWillMount(){
    let data = await CallApi(`project/hasAuth/${this.props.params}`,'GET',
      {},
      'token'
    )
    let auth = data.data.hasAuth
    this.setState({
      auth: auth
    })
  }
  render() {
    const idproject = this.props.params

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
            {
              this.state.auth ? (
                <li>
                  <Link to={{ pathname: `/config/${idproject}` }}>
                      <span className="fas fa-cog"></span>
                      <p>Config</p>
                  </Link>
                </li>
              ):null
            }
            
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
