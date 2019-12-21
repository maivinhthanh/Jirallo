import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import IteamHeader from '../IteamHeader'
import AddMember from './AddMember'
import AddProcess from './AddProcess'
import EditProject from './EditProject'
import HeaderProject from './HeaderProject'

class ConfigProject extends Component {

  render() {
    const { params } = this.props
    return (
        <div className="row">
            <div className="col-12">
            <HeaderProject/>
            </div>
            
            <div className="col-1" >
                <IteamHeader params={params}/>
            </div>
            <div className="col-11 container" >
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <Link class="nav-link" to={{ pathname: `/config/${params}/edit` }}>
                            <p>Edit Project</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: `/config/${params}/addmember` }}>
                            <p>Add Member</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: `/config/${params}/addprocess` }}>
                            <p>Add Process</p>
                        </Link>
                    </li>
                   
                </ul>
                <Switch>
                        <Route exact path={`/config/${params}/edit`} >
                            <EditProject params={params} />
                        </Route>
                        <Route path={`/config/${params}/addmember`} >
                            <AddMember params={params} />
                        </Route>
                        <Route path={`/config/${params}/addprocess`} >
                            <AddProcess params={params} />
                        </Route>
                </Switch>
            </div>
        </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  null
)(ConfigProject)